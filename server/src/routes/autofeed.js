const express = require('express');
const { query } = require('../config/database');
const { authenticate, requireProjectOwner } = require('../middleware/auth');

const router = express.Router();

// ── Configurar AutoFeed ──────────────────────────────────
router.put('/:id/autofeed', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    const { enabled, frequency, times } = req.body;

    const result = await query(
      `UPDATE projects SET
        autofeed_enabled = COALESCE($1, autofeed_enabled),
        autofeed_frequency = COALESCE($2, autofeed_frequency),
        autofeed_times = COALESCE($3, autofeed_times)
       WHERE id = $4
       RETURNING id, name, autofeed_enabled, autofeed_frequency, autofeed_times`,
      [enabled, frequency, times ? JSON.stringify(times) : null, req.params.id]
    );

    res.json({ autofeed: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── Status do AutoFeed ───────────────────────────────────
router.get('/:id/autofeed/status', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    const project = await query(
      `SELECT autofeed_enabled, autofeed_frequency, autofeed_times FROM projects WHERE id = $1`,
      [req.params.id]
    );

    const pendingPosts = await query(
      `SELECT COUNT(*) FROM posts WHERE project_id = $1 AND status IN ('pending', 'approved', 'scheduled')`,
      [req.params.id]
    );

    const nextScheduled = await query(
      `SELECT scheduled_for FROM posts WHERE project_id = $1 AND status = 'scheduled'
       ORDER BY scheduled_for ASC LIMIT 1`,
      [req.params.id]
    );

    const publishedThisMonth = await query(
      `SELECT COUNT(*) FROM posts WHERE project_id = $1 AND status = 'published'
       AND published_at >= date_trunc('month', NOW())`,
      [req.params.id]
    );

    res.json({
      ...project.rows[0],
      queue_size: parseInt(pendingPosts.rows[0].count),
      next_publish: nextScheduled.rows[0]?.scheduled_for || null,
      published_this_month: parseInt(publishedThisMonth.rows[0].count),
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
