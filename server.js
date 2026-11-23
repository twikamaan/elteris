const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { WebSocketServer } = require('ws');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Sağlık kontrolü
app.get('/api/health', (req, res) => {
  res.json({ ok: true, game: 'Elteriş', realm: 'Anadolu · 3x', time: new Date().toISOString() });
});

// Oyuncu kayıt / yükleme (dosya tabanlı başlangıç — ileride PostgreSQL/SQLite'a kolayca geçer)
app.post('/api/save/:playerId', (req, res) => {
  const safeId = String(req.params.playerId).replace(/[^a-zA-Z0-9_-]/g, '');
  if (!safeId) return res.status(400).json({ error: 'Geçersiz oyuncu kimliği' });
  fs.writeFileSync(path.join(DATA_DIR, `${safeId}.json`), JSON.stringify(req.body));
  res.json({ ok: true });
});

app.get('/api/load/:playerId', (req, res) => {
  const safeId = String(req.params.playerId).replace(/[^a-zA-Z0-9_-]/g, '');
  const file = path.join(DATA_DIR, `${safeId}.json`);
  if (!fs.existsSync(file)) return res.status(404).json({ error: 'Kayıt bulunamadı' });
  res.json(JSON.parse(fs.readFileSync(file, 'utf-8')));
});

// Ödeme Webhook Hazırlığı (PayTR / iyzico / Google Play Billing)
app.post('/api/payment/webhook', (req, res) => {
  // Canlı ödeme sağlayıcı imza doğrulaması buraya eklenecektir
  console.log('[PAYMENT WEBHOOK]', req.body);
  res.json({ status: 'received' });
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (raw) => {
    // Canlı sunucu sohbeti yayını
    wss.clients.forEach((client) => {
      if (client.readyState === 1) client.send(raw.toString());
    });
  });
});

server.listen(PORT, () => {
  console.log(`Elteriş sunucusu http://localhost:${PORT} adresinde çalışıyor!`);
});
