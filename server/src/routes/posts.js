const express = require('express');
const { query } = require('../config/database');
const { authenticate, requireProjectOwner } = require('../middleware/auth');
const aiService = require('../services/ai');

const router = express.Router();

// ── Listar posts do projeto ──────────────────────────────
router.get('/:id/posts', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let where = 'WHERE p.project_id = $1';
    const params = [req.params.id];

    if (status) {
      where += ` AND p.status = $${params.length + 1}`;
      params.push(status);
    }

    const result = await query(
      `SELECT p.*,
              (SELECT COUNT(*) FROM slides WHERE post_id = p.id) as slide_count,
              (SELECT json_agg(s ORDER BY s.order_index) FROM slides s WHERE s.post_id = p.id) as slides
       FROM posts p
       ${where}
       ORDER BY p.created_at DESC
       LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limit, offset]
    );

    const countResult = await query(
      `SELECT COUNT(*) FROM posts p ${where}`,
      params
    );

    res.json({
      posts: result.rows,
      total: parseInt(countResult.rows[0].count),
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (err) {
    next(err);
  }
});

// ── Gerar post com IA ────────────────────────────────────
router.post('/:id/posts/generate', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    const { topic, num_slides = 7 } = req.body;
    if (!topic) {
      return res.status(400).json({ error: 'Informe o tema do post' });
    }

    // Check plan limits
    const limitCheck = await checkPostLimit(req.params.id, req.user.plan);
    if (!limitCheck.ok) {
      return res.status(403).json({ error: limitCheck.message, upgrade: true });
    }

    // Get project + brand info
    const project = await query(
      `SELECT p.*, bd.brand_name, bd.primary_color, bd.font_title
       FROM projects p
       LEFT JOIN brand_dna bd ON bd.project_id = p.id
       WHERE p.id = $1`,
      [req.params.id]
    );
    const proj = project.rows[0];

    // Generate with AI
    const content = await aiService.generateCarousel({
      topic,
      niche: proj.niche,
      toneOfVoice: proj.tone_of_voice,
      brandName: proj.brand_name || proj.name,
      numSlides: num_slides,
    });

    // Save post
    const postResult = await query(
      `INSERT INTO posts (project_id, status, caption, hashtags, source, ai_prompt)
       VALUES ($1, 'pending', $2, $3, 'ai', $4)
       RETURNING *`,
      [req.params.id, content.caption, content.hashtags, topic]
    );
    const post = postResult.rows[0];

    // Save slides
    for (let i = 0; i < content.slides.length; i++) {
      const slide = content.slides[i];
      await query(
        `INSERT INTO slides (post_id, order_index, text_headline, text_body, text_cta)
         VALUES ($1, $2, $3, $4, $5)`,
        [post.id, i, slide.headline, slide.body, slide.cta || null]
      );
    }

    // Return post with slides
    const fullPost = await query(
      `SELECT p.*,
              (SELECT json_agg(s ORDER BY s.order_index) FROM slides s WHERE s.post_id = p.id) as slides
       FROM posts p WHERE p.id = $1`,
      [post.id]
    );

    res.status(201).json({ post: fullPost.rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── Gerar post de notícia ────────────────────────────────
router.post('/:id/posts/from-news', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'Informe a URL da notícia' });
    }

    const project = await query(
      `SELECT p.*, bd.brand_name FROM projects p
       LEFT JOIN brand_dna bd ON bd.project_id = p.id
       WHERE p.id = $1`,
      [req.params.id]
    );
    const proj = project.rows[0];

    const content = await aiService.generateFromNews({
      url,
      niche: proj.niche,
      toneOfVoice: proj.tone_of_voice,
      brandName: proj.brand_name || proj.name,
    });

    const postResult = await query(
      `INSERT INTO posts (project_id, status, caption, hashtags, source, source_url, ai_prompt)
       VALUES ($1, 'pending', $2, $3, 'news', $4, $5)
       RETURNING *`,
      [req.params.id, content.caption, content.hashtags, url, `Notícia: ${url}`]
    );
    const post = postResult.rows[0];

    for (let i = 0; i < content.slides.length; i++) {
      const slide = content.slides[i];
      await query(
        `INSERT INTO slides (post_id, order_index, text_headline, text_body, text_cta)
         VALUES ($1, $2, $3, $4, $5)`,
        [post.id, i, slide.headline, slide.body, slide.cta || null]
      );
    }

    const fullPost = await query(
      `SELECT p.*, (SELECT json_agg(s ORDER BY s.order_index) FROM slides s WHERE s.post_id = p.id) as slides
       FROM posts p WHERE p.id = $1`,
      [post.id]
    );

    res.status(201).json({ post: fullPost.rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── Editar post ──────────────────────────────────────────
router.put('/:id/posts/:postId', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    const { caption, hashtags } = req.body;

    const result = await query(
      `UPDATE posts SET caption = COALESCE($1, caption), hashtags = COALESCE($2, hashtags)
       WHERE id = $3 AND project_id = $4
       RETURNING *`,
      [caption, hashtags, req.params.postId, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }

    res.json({ post: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── Aprovar post ─────────────────────────────────────────
router.put('/:id/posts/:postId/approve', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    const result = await query(
      `UPDATE posts SET status = 'approved'
       WHERE id = $1 AND project_id = $2 AND status IN ('draft', 'pending')
       RETURNING *`,
      [req.params.postId, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Post não pode ser aprovado neste estado' });
    }

    res.json({ post: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── Agendar post ─────────────────────────────────────────
router.put('/:id/posts/:postId/schedule', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    const { scheduled_for } = req.body;
    if (!scheduled_for) {
      return res.status(400).json({ error: 'Informe a data/hora do agendamento' });
    }

    const scheduleDate = new Date(scheduled_for);
    if (scheduleDate <= new Date()) {
      return res.status(400).json({ error: 'Data de agendamento deve ser no futuro' });
    }

    const result = await query(
      `UPDATE posts SET status = 'scheduled', scheduled_for = $1
       WHERE id = $2 AND project_id = $3 AND status IN ('draft', 'pending', 'approved')
       RETURNING *`,
      [scheduleDate, req.params.postId, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Post não pode ser agendado neste estado' });
    }

    res.json({ post: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── Regenerar post ───────────────────────────────────────
router.post('/:id/posts/:postId/regenerate', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    const post = await query('SELECT * FROM posts WHERE id = $1 AND project_id = $2', [req.params.postId, req.params.id]);
    if (post.rows.length === 0) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }

    const topic = post.rows[0].ai_prompt || 'conteúdo genérico';
    const project = await query(
      `SELECT p.*, bd.brand_name FROM projects p
       LEFT JOIN brand_dna bd ON bd.project_id = p.id WHERE p.id = $1`,
      [req.params.id]
    );
    const proj = project.rows[0];

    const content = await aiService.generateCarousel({
      topic,
      niche: proj.niche,
      toneOfVoice: proj.tone_of_voice,
      brandName: proj.brand_name || proj.name,
    });

    // Update post
    await query(
      `UPDATE posts SET caption = $1, hashtags = $2, status = 'pending' WHERE id = $3`,
      [content.caption, content.hashtags, req.params.postId]
    );

    // Replace slides
    await query('DELETE FROM slides WHERE post_id = $1', [req.params.postId]);
    for (let i = 0; i < content.slides.length; i++) {
      const slide = content.slides[i];
      await query(
        `INSERT INTO slides (post_id, order_index, text_headline, text_body, text_cta) VALUES ($1, $2, $3, $4, $5)`,
        [req.params.postId, i, slide.headline, slide.body, slide.cta || null]
      );
    }

    const fullPost = await query(
      `SELECT p.*, (SELECT json_agg(s ORDER BY s.order_index) FROM slides s WHERE s.post_id = p.id) as slides
       FROM posts p WHERE p.id = $1`,
      [req.params.postId]
    );

    res.json({ post: fullPost.rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── Deletar post ─────────────────────────────────────────
router.delete('/:id/posts/:postId', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    await query('DELETE FROM posts WHERE id = $1 AND project_id = $2', [req.params.postId, req.params.id]);
    res.json({ message: 'Post deletado' });
  } catch (err) {
    next(err);
  }
});

// ── Helper: limites por plano ────────────────────────────
async function checkPostLimit(projectId, plan) {
  const limits = { free: 3, essential: 10, plus: 30, scale: 999 };
  const max = limits[plan] || 3;

  const result = await query(
    `SELECT COUNT(*) FROM posts
     WHERE project_id = $1
     AND created_at >= date_trunc('month', NOW())`,
    [projectId]
  );

  const count = parseInt(result.rows[0].count);
  if (count >= max) {
    return { ok: false, message: `Limite de ${max} posts/mês atingido. Faça upgrade do plano.` };
  }
  return { ok: true, remaining: max - count };
}

module.exports = router;
