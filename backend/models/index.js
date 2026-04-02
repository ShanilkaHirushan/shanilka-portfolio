const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ─── Blog Post ────────────────────────────────────────────────
const blogSchema = new mongoose.Schema({
  title:     { type: String, required: true, trim: true },
  slug:      { type: String, required: true, unique: true },
  excerpt:   { type: String, required: true },
  content:   { type: String, required: true },
  tags:      [{ type: String }],
  published: { type: Boolean, default: false },
  coverImage:{ type: String, default: '' },
  views:     { type: Number, default: 0 },
}, { timestamps: true });

// ─── Contact Message ──────────────────────────────────────────
const contactSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  message: { type: String, required: true },
  read:    { type: Boolean, default: false },
  ip:      { type: String },
}, { timestamps: true });

// ─── Resume Download ──────────────────────────────────────────
const resumeDownloadSchema = new mongoose.Schema({
  ip:        { type: String },
  userAgent: { type: String },
  referer:   { type: String },
}, { timestamps: true });

// ─── Portfolio Content (editable via admin) ───────────────────
const contentSchema = new mongoose.Schema({
  key:   { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true });

// ─── Admin User ───────────────────────────────────────────────
const adminSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
adminSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = {
  Blog:           mongoose.model('Blog', blogSchema),
  Contact:        mongoose.model('Contact', contactSchema),
  ResumeDownload: mongoose.model('ResumeDownload', resumeDownloadSchema),
  Content:        mongoose.model('Content', contentSchema),
  Admin:          mongoose.model('Admin', adminSchema),
};
