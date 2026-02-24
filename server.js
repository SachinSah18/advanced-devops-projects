const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// Serve static files from repo root (index.html, style.css, etc.)
app.use(express.static(path.join(__dirname, '.')));

// Health endpoint
app.get('/health', (req, res) => res.send('OK'));

// Contact endpoint used by index.html
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'Please provide name, email and message' });
  }

  // TODO: persist to DB / send email. For now just log and return success.
  console.log('Contact message received:', { name, email, message });
  return res.json({ msg: 'Message received — thanks!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
