
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

// Middlewares essenciais
app.use(compression()); // Compacta os arquivos para carregar mais rápido
app.use(cors());
app.use(bodyParser.json());

// Garantir que o arquivo de leads existe
async function initLeadsFile() {
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, JSON.stringify([]));
  }
}

// API: Salvar Lead
app.post('/api/leads', async (req, res) => {
  try {
    const newLead = req.body;
    const data = await fs.readFile(LEADS_FILE, 'utf-8');
    const leads = JSON.parse(data);
    leads.unshift(newLead);
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
    res.status(201).json({ success: true, lead: newLead });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar lead' });
  }
});

// API: Listar Leads
app.get('/api/leads', async (req, res) => {
  try {
    const data = await fs.readFile(LEADS_FILE, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Erro ao ler leads' });
  }
});

// Servir arquivos estáticos da pasta 'dist' (gerada pelo build)
// Se a pasta 'dist' não existir, serve a raiz (fallback para dev)
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));
app.use(express.static(__dirname));

// Fallback para SPA
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return;
  // Tenta enviar o index da dist primeiro
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) res.sendFile(path.join(__dirname, 'index.html'));
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor otimizado rodando na porta ${PORT}`);
  initLeadsFile();
});
