const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(__dirname, 'db.json');

// Utility to read JSON DB
function readDb() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db.json:', err);
    return {};
  }
}

// Utility to write JSON DB
function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing db.json:', err);
    return false;
  }
}

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // Helper to read request JSON body
  const getBody = () => new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });

  // GET /api/state - Return complete system state
  if (req.method === 'GET' && pathname === '/api/state') {
    const db = readDb();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: db }));
    return;
  }

  // POST /api/module/select - Select active backend module
  if (req.method === 'POST' && pathname === '/api/module/select') {
    getBody().then(data => {
      const db = readDb();
      if (data.module) {
        db.active_module = data.module;
        writeDb(db);
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, active_module: db.active_module }));
    });
    return;
  }

  // POST /api/rbac/role - Change active RBAC role
  if (req.method === 'POST' && pathname === '/api/rbac/role') {
    getBody().then(data => {
      const db = readDb();
      if (data.role) {
        db.active_role = data.role;
        writeDb(db);
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, active_role: db.active_role }));
    });
    return;
  }

  // POST /api/qr-logs - Add dynamic QR meal verification entry
  if (req.method === 'POST' && pathname === '/api/qr-logs') {
    getBody().then(data => {
      const db = readDb();
      if (data.log) {
        db.qr_logs = [data.log, ...(db.qr_logs || [])];
        writeDb(db);
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, qr_logs: db.qr_logs }));
    });
    return;
  }

  // POST /api/ecosystem/wallet/receipt - Record grocery receipt
  if (req.method === 'POST' && pathname === '/api/ecosystem/wallet/receipt') {
    getBody().then(data => {
      const db = readDb();
      if (data.receipt && db.wallet) {
        db.wallet.recent_receipts = [data.receipt, ...(db.wallet.recent_receipts || [])];
        db.wallet.spent_this_month += data.receipt.total || 0;
        db.wallet.current_balance -= data.receipt.total || 0;
        writeDb(db);
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, wallet: db.wallet }));
    });
    return;
  }

  // Fallback 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
  console.log(`Menu LENZ Backend REST Server running on http://localhost:${PORT}`);
});
