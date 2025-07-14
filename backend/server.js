const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const PORT = 5000;

dotenv.config();

app.use(cors({
  origin: 'http://localhost:5173', // React app origin
  credentials: true               // Allow cookies/session to be sent
}));

// Middleware
app.use(express.json());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));


// Login endpoint
app.post('/api/AuthPass', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.AUTH_NAME && password === process.env.AUTH_PASS) {
    req.session.authenticated = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Middleware to protect main-site
const requireAuth = (req, res, next) => {
  if (req.session.authenticated) {
    return next();
  }
  res.status(403).send('Forbidden');
};

// Serve main-site only to authenticated users
app.use('/main', requireAuth, express.static(path.join(__dirname, 'main-build')));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
