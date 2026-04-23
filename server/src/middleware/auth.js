const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

/**
 * Middleware de autenticação JWT
 */
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, plan }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    return res.status(401).json({ error: 'Token inválido' });
  }
}

/**
 * Middleware de autorização por plano
 */
function requirePlan(...allowedPlans) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Não autenticado' });
    }
    if (!allowedPlans.includes(req.user.plan)) {
      return res.status(403).json({
        error: 'Seu plano não tem acesso a este recurso',
        required: allowedPlans,
        current: req.user.plan,
      });
    }
    next();
  };
}

/**
 * Middleware que verifica se o projeto pertence ao usuário
 */
async function requireProjectOwner(req, res, next) {
  const projectId = req.params.projectId || req.params.id;
  if (!projectId) return next();

  try {
    const result = await query(
      'SELECT id, user_id FROM projects WHERE id = $1',
      [projectId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    if (result.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado a este projeto' });
    }

    req.project = result.rows[0];
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { authenticate, requirePlan, requireProjectOwner };
