require('dotenv').config();
const { query } = require('../src/config/database');

async function test() {
  try {
    const result = await query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'brand_dna';
    `);
    console.log('--- ESTRUTURA DA TABELA BRAND_DNA ---');
    console.table(result.rows);
    
    const count = await query('SELECT count(*) FROM brand_dna');
    console.log('Total de registros:', count.rows[0].count);
  } catch (err) {
    console.error('❌ ERRO AO VERIFICAR BANCO:', err.message);
  } finally {
    process.exit();
  }
}

test();
