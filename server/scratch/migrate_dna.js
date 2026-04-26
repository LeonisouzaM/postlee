require('dotenv').config();
const { query } = require('../src/config/database');

async function migrate() {
  try {
    console.log('🚀 Iniciando migração...');
    await query(`ALTER TABLE brand_dna ADD COLUMN IF NOT EXISTS full_config JSONB DEFAULT '{}';`);
    console.log('✅ Coluna full_config adicionada com sucesso!');
  } catch (err) {
    console.error('❌ ERRO NA MIGRAÇÃO:', err.message);
  } finally {
    process.exit();
  }
}

migrate();
