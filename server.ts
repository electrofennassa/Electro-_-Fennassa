import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import { createServer as createViteServer } from 'vite';
import apiRouter from './server/routes/api';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security & Utility Middlewares
  app.use(cors());
  app.use(
    helmet({
      contentSecurityPolicy: false, // Allow inline styles & Unsplash images
      crossOriginEmbedderPolicy: false
    })
  );
  app.use(express.json());

  // Mount API Router FIRST
  app.use('/api', apiRouter);

  // Vite Middleware in Development vs Static Serving in Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ELECTRO_FENNASSA] Serveur démarré sur http://0.0.0.0:${PORT}`);
  });
}

startServer();
