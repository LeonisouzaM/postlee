/**
 * Analytics Background Job
 * 
 * Runs daily and fetches insights for all published posts
 */
const cron = require('node-cron');
const { query } = require('../config/database');
const instagramService = require('../services/instagram');

function startAnalyticsJob() {
  // Run every day at 6:00 AM
  cron.schedule('0 6 * * *', async () => {
    console.log(`\n📊 [Analytics] Coletando métricas... ${new Date().toISOString()}`);

    try {
      // Get all published posts with active Instagram accounts, from last 30 days
      const posts = await query(
        `SELECT p.id, p.ig_post_id, ia.access_token
         FROM posts p
         JOIN projects pr ON pr.id = p.project_id
         JOIN instagram_accounts ia ON ia.project_id = pr.id AND ia.is_active = true
         WHERE p.status = 'published'
           AND p.ig_post_id IS NOT NULL
           AND p.published_at >= NOW() - INTERVAL '30 days'
           AND ia.token_expires_at > NOW()`
      );

      let updated = 0;
      for (const post of posts.rows) {
        try {
          const metrics = await instagramService.getPostInsights(post.ig_post_id, post.access_token);
          if (!metrics) continue;

          const reach = metrics.reach || 0;
          const engagementRate = reach > 0
            ? (((metrics.likes || 0) + (metrics.comments || 0) + (metrics.saves || 0)) / reach) * 100
            : 0;

          await query(
            `INSERT INTO post_analytics (post_id, impressions, reach, likes, comments, saves, shares, engagement_rate)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [post.id, metrics.impressions || 0, reach, metrics.likes || 0,
             metrics.comments || 0, metrics.saves || 0, metrics.shares || 0,
             engagementRate.toFixed(2)]
          );
          updated++;
        } catch (err) {
          console.error(`❌ [Analytics] Erro no post ${post.id}:`, err.message);
        }
      }

      console.log(`📊 [Analytics] ${updated}/${posts.rows.length} posts atualizados`);
    } catch (err) {
      console.error('❌ [Analytics] Erro geral:', err.message);
    }
  });
}

module.exports = { startAnalyticsJob };
