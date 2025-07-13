const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/AuthPass', async (req, res) => {
  const { name, pass } = req.body;

  if (!name || !pass) {
    return res.status(400).json({ error: 'Name and password are required.' });
  }

  // Here you would typically check the credentials against a database
  if (name === process.env.AUTH_NAME && pass === process.env.AUTH_PASS) {
    return res.status(200).json({ success: true, message: 'Authentication successful!' });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
