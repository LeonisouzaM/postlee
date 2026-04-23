const express = require('express');
const { query } = require('../config/database');
const { authenticate, requireProjectOwner } = require('../middleware/auth');

const router = express.Router();

// ── Listar projetos do usuário ───────────────────────────
router.get('/', authenticate, async (req, res, next) => {
  try {
    const result = await query(
      `SELECT p.*, 
              bd.brand_name, bd.logo_url,
              ia.ig_username, ia.is_active as ig_connected,
              (SELECT COUNT(*) FROM posts WHERE project_id = p.id) as total_posts,
              (SELECT COUNT(*) FROM posts WHERE project_id = p.id AND status = 'published') as published_posts
       FROM projects p
       LEFT JOIN brand_dna bd ON bd.project_id = p.id
       LEFT JOIN instagram_accounts ia ON ia.project_id = p.id
       WHERE p.user_id = $1
       ORDER BY p.created_at DESC`,
      [req.user.id]
    );
    res.json({ projects: result.rows });
  } catch (err) {
    next(err);
  }
});

// ── Criar projeto ────────────────────────────────────────
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { name, niche, tone_of_voice, target_audience } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Nome do projeto é obrigatório' });
    }

    // Limit by plan
    const countResult = await query(
      'SELECT COUNT(*) FROM projects WHERE user_id = $1',
      [req.user.id]
    );
    const count = parseInt(countResult.rows[0].count);
    const limits = { free: 1, essential: 1, plus: 1, scale: 10 };
    const limit = limits[req.user.plan] || 1;

    if (count >= limit) {
      return res.status(403).json({
        error: `Seu plano permite no máximo ${limit} projeto(s)`,
        upgrade: true,
      });
    }

    const result = await query(
      `INSERT INTO projects (user_id, name, niche, tone_of_voice, target_audience) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [req.user.id, name, niche || null, tone_of_voice || 'profissional', target_audience || null]
    );

    // Auto-create brand_dna entry
    await query(
      `INSERT INTO brand_dna (project_id, brand_name) VALUES ($1, $2)`,
      [result.rows[0].id, name]
    );

    res.status(201).json({ project: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── Obter projeto ────────────────────────────────────────
router.get('/:id', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    const result = await query(
      `SELECT p.*, 
              row_to_json(bd.*) as brand_dna,
              row_to_json(ia.*) as instagram
       FROM projects p
       LEFT JOIN brand_dna bd ON bd.project_id = p.id
       LEFT JOIN instagram_accounts ia ON ia.project_id = p.id
       WHERE p.id = $1`,
      [req.params.id]
    );
    res.json({ project: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── Atualizar projeto ────────────────────────────────────
router.put('/:id', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    const { name, niche, tone_of_voice, target_audience } = req.body;

    const result = await query(
      `UPDATE projects 
       SET name = COALESCE($1, name),
           niche = COALESCE($2, niche),
           tone_of_voice = COALESCE($3, tone_of_voice),
           target_audience = COALESCE($4, target_audience)
       WHERE id = $5
       RETURNING *`,
      [name, niche, tone_of_voice, target_audience, req.params.id]
    );

    res.json({ project: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── Deletar projeto ──────────────────────────────────────
router.delete('/:id', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    await query('DELETE FROM projects WHERE id = $1', [req.params.id]);
    res.json({ message: 'Projeto deletado com sucesso' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
