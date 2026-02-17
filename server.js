import express from 'express';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Porta dinâmica injetada pela Hostinger
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(cors());
app.use(express.json());

// Forçar MIME types corretos no nível da aplicação para garantir que o navegador aceite os .tsx
app.use((req, res, next) => {
  if (req.url.endsWith('.tsx')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

// Serve todos os arquivos da raiz como estáticos
app.use(express.static(__dirname));

// API para Leads (Fallback)
app.post('/api/leads', (req, res) => {
  console.log("Recebido lead no servidor:", req.body);
  res.status(200).json({ success: true, message: "Lead recebido" });
});

app.get('/api/leads', (req, res) => {
  res.json([]);
});

// Redireciona qualquer rota não encontrada para o index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`>>> Servidor Ativo na Porta: ${PORT}`);
});