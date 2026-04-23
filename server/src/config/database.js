const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('❌ Erro inesperado no pool do PostgreSQL:', err);
});

async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    console.log('✅ PostgreSQL conectado:', result.rows[0].now);
  } catch (err) {
    console.error('❌ Falha ao conectar no PostgreSQL:', err.message);
    throw err;
  }
}

// Helper para queries
async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  if (process.env.NODE_ENV === 'development' && duration > 100) {
    console.log(`⚠️  Query lenta (${duration}ms):`, text.substring(0, 80));
  }
  return res;
}

module.exports = { pool, query, testConnection };
