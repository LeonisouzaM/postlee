const express = require('express');
const { query } = require('../config/database');
const { authenticate } = require('../middleware/auth');
const aiService = require('../services/ai');

const router = express.Router();

// ── Listar slides de um post ─────────────────────────────
router.get('/:postId/slides', authenticate, async (req, res, next) => {
  try {
    const result = await query(
      'SELECT * FROM slides WHERE post_id = $1 ORDER BY order_index',
      [req.params.postId]
    );
    res.json({ slides: result.rows });
  } catch (err) {
    next(err);
  }
});

// ── Editar slide ─────────────────────────────────────────
router.put('/:postId/slides/:slideId', authenticate, async (req, res, next) => {
  try {
    const { text_headline, text_body, text_cta, layout_template, style_overrides } = req.body;

    const result = await query(
      `UPDATE slides SET
        text_headline = COALESCE($1, text_headline),
        text_body = COALESCE($2, text_body),
        text_cta = COALESCE($3, text_cta),
        layout_template = COALESCE($4, layout_template),
        style_overrides = COALESCE($5, style_overrides)
       WHERE id = $6 AND post_id = $7
       RETURNING *`,
      [text_headline, text_body, text_cta, layout_template, 
       style_overrides ? JSON.stringify(style_overrides) : null,
       req.params.slideId, req.params.postId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Slide não encontrado' });
    }

    res.json({ slide: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── Regenerar slide com IA ───────────────────────────────
router.post('/:postId/slides/:slideId/regenerate', authenticate, async (req, res, next) => {
  try {
    const slide = await query('SELECT * FROM slides WHERE id = $1', [req.params.slideId]);
    if (slide.rows.length === 0) {
      return res.status(404).json({ error: 'Slide não encontrado' });
    }

    const post = await query(
      `SELECT p.ai_prompt, pr.tone_of_voice FROM posts p
       JOIN projects pr ON pr.id = p.project_id
       WHERE p.id = $1`,
      [req.params.postId]
    );

    const current = slide.rows[0];
    const newContent = await aiService.regenerateSlide({
      currentHeadline: current.text_headline,
      currentBody: current.text_body,
      context: post.rows[0]?.ai_prompt || '',
      toneOfVoice: post.rows[0]?.tone_of_voice || 'profissional',
    });

    const result = await query(
      `UPDATE slides SET text_headline = $1, text_body = $2, text_cta = $3
       WHERE id = $4 RETURNING *`,
      [newContent.headline, newContent.body, newContent.cta || null, req.params.slideId]
    );

    res.json({ slide: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── Reordenar slides ─────────────────────────────────────
router.put('/:postId/slides/reorder', authenticate, async (req, res, next) => {
  try {
    const { order } = req.body; // [{ id: 'uuid', index: 0 }, ...]
    if (!order || !Array.isArray(order)) {
      return res.status(400).json({ error: 'Envie array "order" com id e index' });
    }

    for (const item of order) {
      await query(
        'UPDATE slides SET order_index = $1 WHERE id = $2 AND post_id = $3',
        [item.index, item.id, req.params.postId]
      );
    }

    const result = await query(
      'SELECT * FROM slides WHERE post_id = $1 ORDER BY order_index',
      [req.params.postId]
    );

    res.json({ slides: result.rows });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
