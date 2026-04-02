const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { ResumeDownload } = require('../models');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, 'resume.pdf'),
});
const upload = multer({ storage, fileFilter: (req, file, cb) => {
  if (file.mimetype !== 'application/pdf') return cb(new Error('Only PDF allowed'));
  cb(null, true);
}});

// GET /api/resume/download - track & serve
router.get('/download', async (req, res) => {
  const filePath = path.join(__dirname, '../uploads/resume.pdf');
  if (!fs.existsSync(filePath))
    return res.status(404).json({ error: 'Resume not found' });

  await ResumeDownload.create({
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    referer: req.headers['referer'] || 'direct',
  });

  res.download(filePath, 'resume.pdf');
});

// GET /api/resume/stats - admin only
router.get('/stats', auth, async (req, res) => {
  const total = await ResumeDownload.countDocuments();
  const last30 = await ResumeDownload.countDocuments({
    createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
  });
  const recent = await ResumeDownload.find().sort({ createdAt: -1 }).limit(20);

  // Group by day for chart
  const byDay = await ResumeDownload.aggregate([
    { $group: {
      _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
      count: { $sum: 1 }
    }},
    { $sort: { _id: 1 } },
    { $limit: 30 }
  ]);

  res.json({ total, last30, recent, byDay });
});

// POST /api/resume/upload - admin only
router.post('/upload', auth, upload.single('resume'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ success: true, message: 'Resume uploaded successfully' });
});

module.exports = router;
