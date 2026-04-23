const express = require('express');
const { query } = require('../config/database');
const { authenticate, requireProjectOwner } = require('../middleware/auth');
const instagramService = require('../services/instagram');

const router = express.Router();

// ── Iniciar conexão OAuth Meta ───────────────────────────
router.post('/:id/instagram/connect', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    if (!process.env.META_APP_ID || !process.env.META_APP_SECRET) {
      return res.status(500).json({ error: 'Integração Meta não configurada no servidor' });
    }
    const authUrl = instagramService.getAuthUrl(req.params.id);
    res.json({ auth_url: authUrl });
  } catch (err) {
    next(err);
  }
});

// ── Status da conexão ────────────────────────────────────
router.get('/:id/instagram/status', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    const result = await query(
      'SELECT ig_username, is_active, connected_at, token_expires_at FROM instagram_accounts WHERE project_id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.json({ connected: false });
    }

    const account = result.rows[0];
    const tokenExpired = account.token_expires_at && new Date(account.token_expires_at) < new Date();

    res.json({
      connected: account.is_active && !tokenExpired,
      username: account.ig_username,
      connected_at: account.connected_at,
      token_expired: tokenExpired,
    });
  } catch (err) {
    next(err);
  }
});

// ── Desconectar Instagram ────────────────────────────────
router.delete('/:id/instagram/disconnect', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    await query(
      'UPDATE instagram_accounts SET is_active = false, access_token = null WHERE project_id = $1',
      [req.params.id]
    );
    res.json({ message: 'Instagram desconectado' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
