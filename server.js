import express from 'express';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// A Hostinger injeta a porta automaticamente em planos Node.js, senão usamos 8080 ou 3000
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(cors());
app.use(express.json());

// Serve os arquivos da raiz (onde está o index.html e os .tsx)
app.use(express.static(__dirname));

// Se houver uma pasta dist (caso tenha feito build local), serve ela também
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// API básica para Leads (Fallback para não dar 404)
app.get('/api/leads', (req, res) => {
  res.json({ message: "API Ativa" });
});

app.post('/api/leads', (req, res) => {
  console.log("Lead recebido:", req.body);
  res.status(200).json({ success: true });
});

// Todas as outras rotas mandam para o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`>>> Servidor Itajaí Metal Rodando na Porta: ${PORT}`);
});