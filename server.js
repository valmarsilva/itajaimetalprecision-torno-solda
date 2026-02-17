import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const LEADS_FILE = path.join(__dirname, 'leads.json');

app.use(compression());
app.use(cors());
app.use(bodyParser.json());

async function initLeadsFile() {
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, JSON.stringify([]));
  }
}

// Rotas de API
app.post('/api/leads', async (req, res) => {
  try {
    const newLead = req.body;
    const data = await fs.readFile(LEADS_FILE, 'utf-8');
    const leads = JSON.parse(data);
    leads.unshift(newLead);
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar lead' });
  }
});

app.get('/api/leads', async (req, res) => {
  try {
    const data = await fs.readFile(LEADS_FILE, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Erro ao ler leads' });
  }
});

// Detecta se existe a pasta dist ou se deve servir da raiz
const distPath = path.join(__dirname, 'dist');
const publicPath = (await fs.access(distPath).then(() => true).catch(() => false)) ? distPath : __dirname;

app.use(express.static(publicPath));

// Fallback para SPA
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return;
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📂 Servindo arquivos de: ${publicPath}`);
  initLeadsFile();
});