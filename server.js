import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4173;

// Health check endpoint ANTES do middleware estático
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    port: port,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));

// Middleware para SPA - todas as outras rotas retornam index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://0.0.0.0:${port}`);
  console.log(`📦 Servindo arquivos de: ${path.join(__dirname, 'dist')}`);
  console.log(`🔍 Health check disponível em: http://0.0.0.0:${port}/health`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
}); 