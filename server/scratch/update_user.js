require('dotenv').config({ path: './.env' });
const { pool } = require('../src/config/database');

async function updateUser() {
  try {
    const res = await pool.query("UPDATE users SET plan = 'scale' WHERE email = 'teste@gmail.com' RETURNING *");
    if (res.rowCount > 0) {
      console.log('✅ Usuário teste@gmail.com atualizado para o plano SCALE!');
      console.log(res.rows[0]);
    } else {
      console.log('❌ Usuário teste@gmail.com não encontrado no banco de dados.');
    }
  } catch (err) {
    console.error('❌ Erro ao atualizar usuário:', err.message);
  } finally {
    await pool.end();
  }
}

updateUser();
