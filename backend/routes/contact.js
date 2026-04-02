const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const { Contact } = require('../models');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

// POST /api/contact
router.post('/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, message } = req.body;
    try {
      // Save to DB
      const contact = await Contact.create({ name, email, message, ip: req.ip });

      // Send email notification
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_TO,
        subject: `New message from ${name}`,
        html: `
          <h2>New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });

      // Auto-reply to sender
      await transporter.sendMail({
        from: `"Your Name" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: `Thanks for reaching out, ${name}!`,
        html: `
          <h2>Got your message!</h2>
          <p>Hi ${name}, thanks for getting in touch. I'll get back to you as soon as possible.</p>
          <br><p>— Your Name</p>
        `,
      });

      res.json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
      console.error('Contact error:', err);
      res.status(500).json({ error: 'Failed to send message. Please try again.' });
    }
  }
);

// GET /api/contact (admin only)
router.get('/', require('../middleware/auth'), async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
});

// PATCH /api/contact/:id/read
router.patch('/:id/read', require('../middleware/auth'), async (req, res) => {
  const msg = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json(msg);
});

module.exports = router;
