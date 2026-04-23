/**
 * Seed script — creates a demo user and project for development
 * Run: npm run db:seed
 */
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const bcrypt = require('bcryptjs');
const { pool, query } = require('./database');

async function seed() {
  console.log('🌱 Populando banco de desenvolvimento...\n');

  try {
    // Create demo user
    const passwordHash = await bcrypt.hash('123456', 12);
    const userResult = await query(
      `INSERT INTO users (name, email, password_hash, plan)
       VALUES ('Admin', 'admin@postlee.com', $1, 'plus')
       ON CONFLICT (email) DO UPDATE SET plan = 'plus'
       RETURNING id, name, email, plan`,
      [passwordHash]
    );
    const user = userResult.rows[0];
    console.log(`  ✅ Usuário: ${user.email} (senha: 123456)`);

    // Create demo project
    const projectResult = await query(
      `INSERT INTO projects (user_id, name, niche, tone_of_voice, target_audience, autofeed_enabled, autofeed_frequency)
       VALUES ($1, 'Minha Marca', 'Marketing Digital', 'profissional', 'Empreendedores e pequenos negócios', true, 5)
       ON CONFLICT DO NOTHING
       RETURNING id, name`,
      [user.id]
    );

    if (projectResult.rows.length > 0) {
      const project = projectResult.rows[0];
      console.log(`  ✅ Projeto: ${project.name}`);

      // Create brand DNA
      await query(
        `INSERT INTO brand_dna (project_id, brand_name, brand_description, primary_color, secondary_color)
         VALUES ($1, 'Minha Marca', 'Marca focada em ajudar empreendedores com marketing digital', '#6366f1', '#a855f7')
         ON CONFLICT (project_id) DO NOTHING`,
        [project.id]
      );
      console.log('  ✅ Brand DNA configurado');

      // Create sample posts
      const topics = [
        { topic: '5 tendências de IA para 2026', slides: 5 },
        { topic: 'Como aumentar o engajamento no Instagram', slides: 7 },
        { topic: 'Guia de carrosséis que convertem', slides: 6 },
      ];

      for (const t of topics) {
        const postResult = await query(
          `INSERT INTO posts (project_id, status, caption, hashtags, source, ai_prompt)
           VALUES ($1, 'pending', $2, $3, 'ai', $4)
           RETURNING id`,
          [project.id, `Post sobre: ${t.topic} 🚀\n\n#postlee #marketing`, 
           ['#postlee', '#marketingdigital'], t.topic]
        );

        for (let i = 0; i < t.slides; i++) {
          await query(
            `INSERT INTO slides (post_id, order_index, text_headline, text_body)
             VALUES ($1, $2, $3, $4)`,
            [postResult.rows[0].id, i, `Slide ${i + 1}: ${t.topic}`, 'Conteúdo de exemplo gerado pelo seed.']
          );
        }
      }
      console.log(`  ✅ ${topics.length} posts de exemplo criados`);
    }

    console.log('\n✅ Seed concluído com sucesso!');
    console.log('\n📌 Para logar: admin@postlee.com / 123456');
  } catch (err) {
    console.error('❌ Erro no seed:', err.message);
  } finally {
    await pool.end();
  }
}

seed();
