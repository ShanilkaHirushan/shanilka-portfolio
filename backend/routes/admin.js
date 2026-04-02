const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Admin, Blog, Contact, ResumeDownload } = require('../models');
const auth = require('../middleware/auth');

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });

  // Allow env-based admin (fallback)
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return res.json({ token, admin: { email } });
  }

  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.comparePassword(password)))
    return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id, email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.json({ token, admin: { email } });
});

// GET /api/admin/dashboard - stats overview
router.get('/dashboard', auth, async (req, res) => {
  const [blogCount, publishedCount, contactCount, unreadCount, resumeTotal] = await Promise.all([
    Blog.countDocuments(),
    Blog.countDocuments({ published: true }),
    Contact.countDocuments(),
    Contact.countDocuments({ read: false }),
    ResumeDownload.countDocuments(),
  ]);
  res.json({ blogCount, publishedCount, contactCount, unreadCount, resumeTotal });
});

// GET /api/admin/me
router.get('/me', auth, (req, res) => res.json({ admin: req.admin }));

module.exports = router;
