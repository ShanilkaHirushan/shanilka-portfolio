const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { Blog } = require('../models');
const auth = require('../middleware/auth');

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// GET /api/blog - public published posts
router.get('/', async (req, res) => {
  const { tag, limit = 10, page = 1 } = req.query;
  const query = { published: true };
  if (tag) query.tags = tag;
  const posts = await Blog.find(query)
    .sort({ createdAt: -1 })
    .limit(+limit).skip((+page - 1) * +limit)
    .select('-content');
  const total = await Blog.countDocuments(query);
  res.json({ posts, total, pages: Math.ceil(total / limit) });
});

// GET /api/blog/:slug - single post (increments views)
router.get('/:slug', async (req, res) => {
  const post = await Blog.findOneAndUpdate(
    { slug: req.params.slug, published: true },
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// ─── Admin routes ─────────────────────────────────────────────

// GET /api/blog/admin/all
router.get('/admin/all', auth, async (req, res) => {
  const posts = await Blog.find().sort({ createdAt: -1 });
  res.json(posts);
});

// POST /api/blog
router.post('/', auth,
  [
    body('title').trim().notEmpty(),
    body('excerpt').trim().notEmpty(),
    body('content').trim().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { title, excerpt, content, tags, published, coverImage } = req.body;
    const slug = slugify(title) + '-' + Date.now();
    const post = await Blog.create({ title, slug, excerpt, content, tags: tags || [], published: published || false, coverImage: coverImage || '' });
    res.status(201).json(post);
  }
);

// PUT /api/blog/:id
router.put('/:id', auth, async (req, res) => {
  const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// DELETE /api/blog/:id
router.delete('/:id', auth, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
