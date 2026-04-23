require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { pool, testConnection } = require('./config/database');

// Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const brandRoutes = require('./routes/brand');
const postRoutes = require('./routes/posts');
const slideRoutes = require('./routes/slides');
const instagramRoutes = require('./routes/instagram');
const autofeedRoutes = require('./routes/autofeed');
const analyticsRoutes = require('./routes/analytics');

// Jobs
const { startAutoFeedJob } = require('./jobs/autofeed');
const { startAnalyticsJob } = require('./jobs/analytics');

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads')));

// ── Health check ─────────────────────────────────────────
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.json({
      status: 'ok',
      service: 'postlee-api',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected', error: err.message });
  }
});

// ── API Routes ───────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projects', brandRoutes);
app.use('/api/projects', postRoutes);
app.use('/api/posts', slideRoutes);
app.use('/api/projects', instagramRoutes);
app.use('/api/projects', autofeedRoutes);
app.use('/api/projects', analyticsRoutes);

// ── 404 handler ──────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// ── Error handler ────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Erro interno do servidor' : err.message,
  });
});

// ── Start Server ─────────────────────────────────────────
async function start() {
  await testConnection();

  app.listen(PORT, () => {
    console.log(`\n🚀 Postlee API rodando na porta ${PORT}`);
    console.log(`   Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log(`   Health:   http://localhost:${PORT}/api/health\n`);
  });

  // Start background jobs
  if (process.env.AUTOFEED_ENABLED === 'true') {
    startAutoFeedJob();
    console.log('⚙️  AutoFeed job iniciado');
  }
  startAnalyticsJob();
  console.log('📊 Analytics job iniciado');
}

start().catch(err => {
  console.error('❌ Falha ao iniciar servidor:', err);
  process.exit(1);
});
