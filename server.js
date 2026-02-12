
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const LEADS_FILE = path.join(__dirname, 'leads.json');

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
    
    leads.unshift(newLead); // Adiciona no início
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

// Servir arquivos estáticos (Frontend)
// Em produção na Hostinger, serviremos a pasta 'dist' ou a raiz
app.use(express.static(__dirname));

// Fallback para SPA (qualquer rota não API volta pro index.html)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return;
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  initLeadsFile();
});
