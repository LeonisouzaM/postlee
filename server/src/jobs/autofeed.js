/**
 * AutoFeed Background Job
 * 
 * Runs on a cron schedule and:
 * 1. Finds projects with AutoFeed enabled
 * 2. Checks if there are scheduled posts ready to publish
 * 3. Publishes them via Instagram API
 * 4. If the queue is empty, generates new posts via AI
 */
const cron = require('node-cron');
const { query } = require('../config/database');
const instagramService = require('../services/instagram');
const aiService = require('../services/ai');

function startAutoFeedJob() {
  const schedule = process.env.AUTOFEED_CHECK_INTERVAL || '*/15 * * * *'; // Every 15 minutes
  
  cron.schedule(schedule, async () => {
    console.log(`\n⚙️  [AutoFeed] Verificando fila... ${new Date().toISOString()}`);

    try {
      // Find projects with AutoFeed enabled and active Instagram
      const projects = await query(
        `SELECT p.*, ia.ig_user_id, ia.access_token, ia.token_expires_at,
                bd.brand_name
         FROM projects p
         JOIN instagram_accounts ia ON ia.project_id = p.id AND ia.is_active = true
         LEFT JOIN brand_dna bd ON bd.project_id = p.id
         WHERE p.autofeed_enabled = true`
      );

      for (const project of projects.rows) {
        try {
          await processProject(project);
        } catch (err) {
          console.error(`❌ [AutoFeed] Erro no projeto ${project.name}:`, err.message);
        }
      }
    } catch (err) {
      console.error('❌ [AutoFeed] Erro geral:', err.message);
    }
  });
}

async function processProject(project) {
  // Check if token is expired
  if (project.token_expires_at && new Date(project.token_expires_at) < new Date()) {
    console.log(`⚠️  [AutoFeed] Token expirado para ${project.name}`);
    return;
  }

  const now = new Date();
  const currentHour = now.getHours().toString().padStart(2, '0') + ':00';
  const scheduledTimes = project.autofeed_times || ['09:00', '12:00', '18:00'];

  // Check if current time matches one of the scheduled times (within 15 min window)
  const isPublishTime = scheduledTimes.some(time => {
    const [h, m] = time.split(':');
    const scheduled = new Date(now);
    scheduled.setHours(parseInt(h), parseInt(m), 0, 0);
    const diff = Math.abs(now - scheduled) / 60000; // Minutes
    return diff <= 15;
  });

  if (!isPublishTime) return;

  // Check for posts ready to publish
  const readyPost = await query(
    `SELECT p.*, 
            (SELECT json_agg(s ORDER BY s.order_index) FROM slides s WHERE s.post_id = p.id) as slides
     FROM posts p
     WHERE p.project_id = $1
       AND p.status IN ('approved', 'scheduled')
       AND (p.scheduled_for IS NULL OR p.scheduled_for <= NOW())
     ORDER BY p.created_at ASC
     LIMIT 1`,
    [project.id]
  );

  if (readyPost.rows.length > 0) {
    // Publish existing post
    await publishPost(readyPost.rows[0], project);
  } else {
    // Auto-generate new post if queue is empty
    console.log(`🤖 [AutoFeed] Gerando post automático para ${project.name}...`);
    await autoGeneratePost(project);
  }
}

async function publishPost(post, project) {
  try {
    // Update status to publishing
    await query('UPDATE posts SET status = $1 WHERE id = $2', ['publishing', post.id]);

    // Get image URLs from slides
    const imageUrls = (post.slides || [])
      .filter(s => s.image_url)
      .map(s => s.image_url);

    if (imageUrls.length === 0) {
      console.log(`⚠️  [AutoFeed] Post ${post.id} sem imagens, pulando...`);
      await query('UPDATE posts SET status = $1, error_message = $2 WHERE id = $3',
        ['failed', 'Nenhuma imagem encontrada nos slides', post.id]);
      return;
    }

    // Publish via Instagram
    const result = await instagramService.publishCarousel(
      project.ig_user_id,
      project.access_token,
      imageUrls,
      post.caption || ''
    );

    // Update post as published
    await query(
      `UPDATE posts SET status = 'published', published_at = NOW(), 
       ig_post_id = $1, ig_permalink = $2 WHERE id = $3`,
      [result.igPostId, result.permalink, post.id]
    );

    console.log(`✅ [AutoFeed] Post publicado: ${result.permalink}`);
  } catch (err) {
    console.error(`❌ [AutoFeed] Falha ao publicar:`, err.message);
    await query(
      `UPDATE posts SET status = 'failed', error_message = $1 WHERE id = $2`,
      [err.message, post.id]
    );
  }
}

async function autoGeneratePost(project) {
  try {
    // Generate topics based on niche
    const topics = [
      `Dicas essenciais de ${project.niche || 'negócios'} para iniciantes`,
      `Erros comuns que profissionais de ${project.niche || 'negócios'} cometem`,
      `Tendências de ${project.niche || 'mercado'} para ficar de olho`,
      `Como melhorar seus resultados em ${project.niche || 'negócios'}`,
      `O guia definitivo para ${project.niche || 'crescimento profissional'}`,
    ];
    const topic = topics[Math.floor(Math.random() * topics.length)];

    const content = await aiService.generateCarousel({
      topic,
      niche: project.niche,
      toneOfVoice: project.tone_of_voice,
      brandName: project.brand_name || project.name,
    });

    // Save as pending (user can still review if they want)
    const postResult = await query(
      `INSERT INTO posts (project_id, status, caption, hashtags, source, ai_prompt)
       VALUES ($1, 'pending', $2, $3, 'ai', $4) RETURNING id`,
      [project.id, content.caption, content.hashtags, topic]
    );

    for (let i = 0; i < content.slides.length; i++) {
      const slide = content.slides[i];
      await query(
        `INSERT INTO slides (post_id, order_index, text_headline, text_body, text_cta)
         VALUES ($1, $2, $3, $4, $5)`,
        [postResult.rows[0].id, i, slide.headline, slide.body, slide.cta || null]
      );
    }

    console.log(`🤖 [AutoFeed] Post gerado automaticamente: ${topic}`);
  } catch (err) {
    console.error(`❌ [AutoFeed] Erro ao gerar post:`, err.message);
  }
}

module.exports = { startAutoFeedJob };
