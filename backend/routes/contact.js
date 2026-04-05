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
    body('message').trim().isLength({ min: 5 }).withMessage('Message must be at least 5 characters'),
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
        from: `"Shanilka Hirushan" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: `Thanks for reaching out, ${name}! — Shanilka Hirushan`,
        html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Message Received</title>
    </head>
    <body style="
      margin: 0;
      padding: 0;
      background-color: #0a0f1a;
      font-family: 'Segoe UI', Arial, sans-serif;
    ">
      <table width="100%" cellpadding="0" cellspacing="0"
        style="background-color: #0a0f1a; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0"
              style="
                max-width: 600px;
                width: 100%;
                background-color: #0d1f26;
                border-radius: 16px;
                border: 1px solid rgba(20,184,145,0.2);
                overflow: hidden;
              ">

              <!-- Header -->
              <tr>
                <td style="
                  background: linear-gradient(135deg, #0d2a22 0%, #0d1f26 100%);
                  padding: 40px 40px 30px;
                  border-bottom: 1px solid rgba(20,184,145,0.15);
                  text-align: center;
                ">
                  <!-- Logo / Name -->
                  <div style="
                    display: inline-block;
                    background: rgba(20,184,145,0.1);
                    border: 1px solid rgba(20,184,145,0.3);
                    border-radius: 8px;
                    padding: 8px 20px;
                    margin-bottom: 20px;
                  ">
                    <span style="
                      color: #14b891;
                      font-family: 'Courier New', monospace;
                      font-size: 14px;
                      letter-spacing: 2px;
                    ">&lt; SH /&gt;</span>
                  </div>

                  <h1 style="
                    color: #ffffff;
                    font-size: 26px;
                    font-weight: 700;
                    margin: 0 0 8px 0;
                    letter-spacing: -0.5px;
                  ">Message Received! 🎉</h1>

                  <p style="
                    color: #14b891;
                    font-size: 14px;
                    margin: 0;
                    font-family: 'Courier New', monospace;
                  ">// response incoming...</p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 40px;">

                  <!-- Greeting -->
                  <p style="
                    color: #e2f0ec;
                    font-size: 16px;
                    margin: 0 0 20px 0;
                    line-height: 1.6;
                  ">Hi <strong style="color: #14b891;">${name}</strong>,</p>

                  <p style="
                    color: #9ab8b0;
                    font-size: 15px;
                    line-height: 1.8;
                    margin: 0 0 20px 0;
                  ">
                    Thank you for reaching out! I've successfully received
                    your message and truly appreciate you taking the time
                    to connect with me.
                  </p>

                  <p style="
                    color: #9ab8b0;
                    font-size: 15px;
                    line-height: 1.8;
                    margin: 0 0 30px 0;
                  ">
                    I'll review your message carefully and get back to you
                    within <strong style="color: #ffffff;">24–48 hours</strong>.
                    In the meantime, feel free to explore my work or
                    connect with me on LinkedIn.
                  </p>

                  <!-- Message Summary Card -->
                  <div style="
                    background: rgba(20,184,145,0.05);
                    border: 1px solid rgba(20,184,145,0.15);
                    border-left: 3px solid #14b891;
                    border-radius: 8px;
                    padding: 20px 24px;
                    margin: 0 0 30px 0;
                  ">
                    <p style="
                      color: #14b891;
                      font-size: 11px;
                      font-family: 'Courier New', monospace;
                      letter-spacing: 2px;
                      text-transform: uppercase;
                      margin: 0 0 12px 0;
                    ">// Your Message Summary</p>

                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="
                          color: #5a8a7a;
                          font-size: 12px;
                          font-family: 'Courier New', monospace;
                          padding: 4px 0;
                          width: 80px;
                          vertical-align: top;
                        ">From:</td>
                        <td style="
                          color: #e2f0ec;
                          font-size: 13px;
                          padding: 4px 0;
                        ">${name}</td>
                      </tr>
                      <tr>
                        <td style="
                          color: #5a8a7a;
                          font-size: 12px;
                          font-family: 'Courier New', monospace;
                          padding: 4px 0;
                          vertical-align: top;
                        ">Email:</td>
                        <td style="
                          color: #e2f0ec;
                          font-size: 13px;
                          padding: 4px 0;
                        ">${email}</td>
                      </tr>
                      <tr>
                        <td style="
                          color: #5a8a7a;
                          font-size: 12px;
                          font-family: 'Courier New', monospace;
                          padding: 4px 0;
                          vertical-align: top;
                        ">Subject:</td>
                        <td style="
                          color: #e2f0ec;
                          font-size: 13px;
                          padding: 4px 0;
                        ">${subject || 'General Inquiry'}</td>
                      </tr>
                      <tr>
                        <td style="
                          color: #5a8a7a;
                          font-size: 12px;
                          font-family: 'Courier New', monospace;
                          padding: 4px 0;
                          vertical-align: top;
                        ">Status:</td>
                        <td style="padding: 4px 0;">
                          <span style="
                            background: rgba(20,184,145,0.15);
                            color: #14b891;
                            font-size: 11px;
                            font-family: 'Courier New', monospace;
                            padding: 2px 10px;
                            border-radius: 20px;
                            border: 1px solid rgba(20,184,145,0.25);
                          ">● RECEIVED</span>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <!-- CTA Buttons -->
                  <table width="100%" cellpadding="0" cellspacing="0"
                    style="margin: 0 0 30px 0;">
                    <tr>
                      <td align="center">
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <!-- View Portfolio Button -->
                            <td style="padding: 0 8px 0 0;">
                              <a href="https://shanilka-portfolio.vercel.app"
                                style="
                                  display: inline-block;
                                  background: linear-gradient(135deg, #14b891, #0b9475);
                                  color: #050c10;
                                  text-decoration: none;
                                  font-size: 13px;
                                  font-weight: 700;
                                  padding: 12px 24px;
                                  border-radius: 6px;
                                  letter-spacing: 0.5px;
                                ">
                                View Portfolio →
                              </a>
                            </td>
                            <!-- LinkedIn Button -->
                            <td style="padding: 0 0 0 8px;">
                              <a href="https://linkedin.com/in/shanilkahirushan"
                                style="
                                  display: inline-block;
                                  background: transparent;
                                  color: #14b891;
                                  text-decoration: none;
                                  font-size: 13px;
                                  font-weight: 600;
                                  padding: 11px 24px;
                                  border-radius: 6px;
                                  border: 1px solid rgba(20,184,145,0.35);
                                  letter-spacing: 0.5px;
                                ">
                                LinkedIn
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Divider -->
                  <div style="
                    height: 1px;
                    background: linear-gradient(90deg,
                      rgba(20,184,145,0.3),
                      rgba(20,184,145,0.05));
                    margin: 0 0 24px 0;
                  "></div>

                  <!-- Signature -->
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <!-- Avatar -->
                      <td style="padding-right: 16px; vertical-align: middle;">
                        <div style="
                          width: 48px;
                          height: 48px;
                          background: linear-gradient(135deg, #14b891, #0b9475);
                          border-radius: 50%;
                          text-align: center;
                          line-height: 48px;
                          font-size: 20px;
                          font-weight: 700;
                          color: #050c10;
                        ">S</div>
                      </td>
                      <!-- Info -->
                      <td style="vertical-align: middle;">
                        <p style="
                          color: #ffffff;
                          font-size: 15px;
                          font-weight: 600;
                          margin: 0 0 3px 0;
                        ">Shanilka Hirushan</p>
                        <p style="
                          color: #14b891;
                          font-size: 12px;
                          font-family: 'Courier New', monospace;
                          margin: 0 0 3px 0;
                        ">ICT Undergraduate</p>
                        <p style="
                          color: #5a8a7a;
                          font-size: 11px;
                          margin: 0;
                        ">Uva Wellassa University of Sri Lanka</p>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="
                  background: rgba(0,0,0,0.2);
                  padding: 20px 40px;
                  border-top: 1px solid rgba(20,184,145,0.1);
                  text-align: center;
                ">
                  <!-- Social Links -->
                  <table width="100%" cellpadding="0" cellspacing="0"
                    style="margin-bottom: 16px;">
                    <tr>
                      <td align="center">
                        <a href="https://github.com/shanilkahirushan"
                          style="
                            color: #5a8a7a;
                            text-decoration: none;
                            font-size: 12px;
                            margin: 0 12px;
                            font-family: 'Courier New', monospace;
                          ">GitHub</a>
                        <span style="color: #1e3a30;">|</span>
                        <a href="https://linkedin.com/in/shanilkahirushan"
                          style="
                            color: #5a8a7a;
                            text-decoration: none;
                            font-size: 12px;
                            margin: 0 12px;
                            font-family: 'Courier New', monospace;
                          ">LinkedIn</a>
                        <span style="color: #1e3a30;">|</span>
                        <a href="https://shanilka-portfolio.vercel.app"
                          style="
                            color: #5a8a7a;
                            text-decoration: none;
                            font-size: 12px;
                            margin: 0 12px;
                            font-family: 'Courier New', monospace;
                          ">Portfolio</a>
                      </td>
                    </tr>
                  </table>

                  <p style="
                    color: #2a5a48;
                    font-size: 11px;
                    margin: 0;
                    line-height: 1.6;
                  ">
                    © ${new Date().getFullYear()} Shanilka Hirushan.
                    All rights reserved.<br>
                    This is an automated response —
                    please do not reply to this email.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
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
