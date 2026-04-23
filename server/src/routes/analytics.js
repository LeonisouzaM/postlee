const express = require('express');
const { query } = require('../config/database');
const { authenticate, requireProjectOwner } = require('../middleware/auth');

const router = express.Router();

// ── Dashboard geral ──────────────────────────────────────
router.get('/:id/analytics', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    // Posts overview
    const postsOverview = await query(
      `SELECT
        COUNT(*) FILTER (WHERE status = 'published') as published,
        COUNT(*) FILTER (WHERE status = 'scheduled') as scheduled,
        COUNT(*) FILTER (WHERE status IN ('draft','pending')) as drafts,
        COUNT(*) as total
       FROM posts WHERE project_id = $1`,
      [req.params.id]
    );

    // Engagement this month
    const engagement = await query(
      `SELECT
        COALESCE(SUM(pa.impressions), 0) as total_impressions,
        COALESCE(SUM(pa.reach), 0) as total_reach,
        COALESCE(SUM(pa.likes), 0) as total_likes,
        COALESCE(SUM(pa.comments), 0) as total_comments,
        COALESCE(SUM(pa.saves), 0) as total_saves,
        COALESCE(AVG(pa.engagement_rate), 0) as avg_engagement
       FROM post_analytics pa
       JOIN posts p ON p.id = pa.post_id
       WHERE p.project_id = $1
       AND pa.fetched_at >= date_trunc('month', NOW())`,
      [req.params.id]
    );

    // Recent posts performance
    const recentPosts = await query(
      `SELECT p.id, p.caption, p.published_at,
              pa.impressions, pa.reach, pa.likes, pa.comments, pa.saves, pa.engagement_rate
       FROM posts p
       LEFT JOIN LATERAL (
         SELECT * FROM post_analytics WHERE post_id = p.id ORDER BY fetched_at DESC LIMIT 1
       ) pa ON true
       WHERE p.project_id = $1 AND p.status = 'published'
       ORDER BY p.published_at DESC LIMIT 10`,
      [req.params.id]
    );

    res.json({
      overview: postsOverview.rows[0],
      engagement: engagement.rows[0],
      recent_posts: recentPosts.rows,
    });
  } catch (err) {
    next(err);
  }
});

// ── Melhores horários ────────────────────────────────────
router.get('/:id/analytics/best-times', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    const result = await query(
      `SELECT
        EXTRACT(DOW FROM p.published_at) as day_of_week,
        EXTRACT(HOUR FROM p.published_at) as hour,
        AVG(pa.engagement_rate) as avg_engagement,
        COUNT(*) as post_count
       FROM posts p
       JOIN post_analytics pa ON pa.post_id = p.id
       WHERE p.project_id = $1 AND p.status = 'published'
       GROUP BY day_of_week, hour
       HAVING COUNT(*) >= 2
       ORDER BY avg_engagement DESC
       LIMIT 10`,
      [req.params.id]
    );

    res.json({ best_times: result.rows });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
