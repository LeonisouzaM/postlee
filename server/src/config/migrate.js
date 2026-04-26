/**
 * Database Migration Script
 * Run: npm run db:migrate
 */
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const { pool } = require('./database');

const MIGRATIONS = [
  // ── Users ──────────────────────────────────────────
  `CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    plan VARCHAR(20) DEFAULT 'free' CHECK (plan IN ('free','essential','plus','scale')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`,

  // ── Projects ───────────────────────────────────────
  `CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    niche VARCHAR(255),
    tone_of_voice VARCHAR(50) DEFAULT 'profissional'
      CHECK (tone_of_voice IN ('profissional','casual','técnico','inspirador','humorístico')),
    target_audience TEXT,
    autofeed_enabled BOOLEAN DEFAULT false,
    autofeed_frequency INT DEFAULT 3,
    autofeed_times JSONB DEFAULT '["09:00","12:00","18:00"]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`,

  // ── Brand DNA ──────────────────────────────────────
  `CREATE TABLE IF NOT EXISTS brand_dna (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID UNIQUE NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    brand_name VARCHAR(255),
    brand_description TEXT,
    primary_color VARCHAR(7) DEFAULT '#6366f1',
    secondary_color VARCHAR(7) DEFAULT '#a855f7',
    accent_color VARCHAR(7) DEFAULT '#10b981',
    background_color VARCHAR(7) DEFAULT '#ffffff',
    font_title VARCHAR(100) DEFAULT 'Inter',
    font_body VARCHAR(100) DEFAULT 'Inter',
    logo_url TEXT,
    image_style VARCHAR(50) DEFAULT 'jornalístico',
    design_style VARCHAR(50) DEFAULT 'moderno',
    style_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`,

  // ── Instagram Accounts ─────────────────────────────
  `CREATE TABLE IF NOT EXISTS instagram_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID UNIQUE NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    ig_user_id VARCHAR(100),
    ig_username VARCHAR(100),
    access_token TEXT,
    token_expires_at TIMESTAMPTZ,
    page_id VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    connected_at TIMESTAMPTZ DEFAULT NOW()
  )`,

  // ── Posts ───────────────────────────────────────────
  `CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'draft'
      CHECK (status IN ('draft','pending','approved','scheduled','publishing','published','failed')),
    caption TEXT,
    hashtags TEXT[] DEFAULT '{}',
    scheduled_for TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    ig_post_id VARCHAR(100),
    ig_permalink TEXT,
    source VARCHAR(20) DEFAULT 'ai' CHECK (source IN ('ai','manual','news')),
    source_url TEXT,
    error_message TEXT,
    ai_prompt TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`,

  // ── Slides ─────────────────────────────────────────
  `CREATE TABLE IF NOT EXISTS slides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    order_index INT NOT NULL DEFAULT 0,
    image_url TEXT,
    text_headline TEXT,
    text_body TEXT,
    text_cta TEXT,
    layout_template VARCHAR(50) DEFAULT 'default',
    style_overrides JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,

  // ── Post Analytics ─────────────────────────────────
  `CREATE TABLE IF NOT EXISTS post_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    impressions INT DEFAULT 0,
    reach INT DEFAULT 0,
    likes INT DEFAULT 0,
    comments INT DEFAULT 0,
    saves INT DEFAULT 0,
    shares INT DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0,
    fetched_at TIMESTAMPTZ DEFAULT NOW()
  )`,

  // ── Indexes ────────────────────────────────────────
  `CREATE INDEX IF NOT EXISTS idx_projects_user ON projects(user_id)`,
  `CREATE INDEX IF NOT EXISTS idx_posts_project ON posts(project_id)`,
  `CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status)`,
  `CREATE INDEX IF NOT EXISTS idx_posts_scheduled ON posts(scheduled_for) WHERE status = 'scheduled'`,
  `CREATE INDEX IF NOT EXISTS idx_slides_post ON slides(post_id)`,
  `CREATE INDEX IF NOT EXISTS idx_analytics_post ON post_analytics(post_id)`,

  // ── Updated_at trigger ─────────────────────────────
  `CREATE OR REPLACE FUNCTION update_updated_at()
   RETURNS TRIGGER AS $$
   BEGIN
     NEW.updated_at = NOW();
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql`,

  `DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_users_updated') THEN
      CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_projects_updated') THEN
      CREATE TRIGGER trg_projects_updated BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_brand_updated') THEN
      CREATE TRIGGER trg_brand_updated BEFORE UPDATE ON brand_dna FOR EACH ROW EXECUTE FUNCTION update_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_posts_updated') THEN
      CREATE TRIGGER trg_posts_updated BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
    END IF;
  END $$`,
];

async function migrate() {
  console.log('🔄 Iniciando migrações...\n');
  const client = await pool.connect();

  try {
    for (let i = 0; i < MIGRATIONS.length; i++) {
      const sql = MIGRATIONS[i];
      const preview = sql.replace(/\s+/g, ' ').substring(0, 60);
      process.stdout.write(`  [${i + 1}/${MIGRATIONS.length}] ${preview}...`);
      await client.query(sql);
      console.log(' ✅');
    }
    console.log('\n✅ Todas as migrações executadas com sucesso!');
  } catch (err) {
    console.error('\n❌ Erro na migração:', err.message);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch(() => process.exit(1));
