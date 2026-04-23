const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { query } = require('../config/database');
const { authenticate, requireProjectOwner } = require('../middleware/auth');

const router = express.Router();

// Multer config for logo upload
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    cb(null, allowed.includes(file.mimetype));
  },
});

// ── Get Brand DNA ────────────────────────────────────────
router.get('/:id/brand', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    const result = await query(
      'SELECT * FROM brand_dna WHERE project_id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Brand DNA não configurado' });
    }

    res.json({ brand: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── Update Brand DNA ─────────────────────────────────────
router.put('/:id/brand', authenticate, requireProjectOwner, async (req, res, next) => {
  try {
    const {
      brand_name, brand_description,
      primary_color, secondary_color, accent_color, background_color,
      font_title, font_body, style_notes,
    } = req.body;

    const result = await query(
      `UPDATE brand_dna SET
        brand_name = COALESCE($1, brand_name),
        brand_description = COALESCE($2, brand_description),
        primary_color = COALESCE($3, primary_color),
        secondary_color = COALESCE($4, secondary_color),
        accent_color = COALESCE($5, accent_color),
        background_color = COALESCE($6, background_color),
        font_title = COALESCE($7, font_title),
        font_body = COALESCE($8, font_body),
        style_notes = COALESCE($9, style_notes)
       WHERE project_id = $10
       RETURNING *`,
      [brand_name, brand_description, primary_color, secondary_color,
       accent_color, background_color, font_title, font_body, style_notes,
       req.params.id]
    );

    res.json({ brand: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── Upload Logo ──────────────────────────────────────────
router.post('/:id/brand/logo', authenticate, requireProjectOwner, upload.single('logo'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const uploadDir = path.join(__dirname, '../..', process.env.UPLOAD_DIR || 'uploads', 'logos');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `logo_${req.params.id}_${Date.now()}.webp`;
    const filepath = path.join(uploadDir, filename);

    // Resize and optimize
    await sharp(req.file.buffer)
      .resize(400, 400, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 90 })
      .toFile(filepath);

    const logoUrl = `/uploads/logos/${filename}`;

    await query(
      'UPDATE brand_dna SET logo_url = $1 WHERE project_id = $2',
      [logoUrl, req.params.id]
    );

    res.json({ logo_url: logoUrl });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
