require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const { pool } = require('./database');

async function runFix() {
  try {
    console.log('🔄 Adicionando colunas de estilo ao banco de dados...');
    
    await pool.query(`
      ALTER TABLE brand_dna 
      ADD COLUMN IF NOT EXISTS image_style VARCHAR(50) DEFAULT 'jornalístico',
      ADD COLUMN IF NOT EXISTS design_style VARCHAR(50) DEFAULT 'moderno';
    `);
    
    console.log('✅ Banco de dados atualizado com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao atualizar banco:', err);
    process.exit(1);
  }
}

runFix();
