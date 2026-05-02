const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { to, subject, whatsapp_link } = req.body || {};

  if (!to) {
    return res.status(400).json({ success: false, error: 'Recipient email is required' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'geetanshuchhabra123@gmail.com',
      pass: 'yicjliyvzuwadtfr'
    }
  });

  const waLink = whatsapp_link || 'https://chat.whatsapp.com/DvcxL1vLTKa9ReNe1UKSo2';

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f9fafb; margin: 0; padding: 0; }
    .wrap { max-width: 560px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 16px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #16a34a, #22c55e); padding: 36px 32px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { color: rgba(255,255,255,0.88); margin: 8px 0 0; font-size: 14px; }
    .body { padding: 32px; }
    .body p { color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 16px; }
    .cta { display: block; background: #25D366; color: #fff !important; text-decoration: none; text-align: center; padding: 15px 24px; border-radius: 8px; font-size: 15px; font-weight: 700; margin: 24px 0; }
    .footer { border-top: 1px solid #e5e7eb; padding: 20px 32px; text-align: center; }
    .footer p { color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <h1>Enrollment Confirmed</h1>
      <p>AI Income Masterclass</p>
    </div>
    <div class="body">
      <p>Hi there,</p>
      <p>Thank you for enrolling in the <strong>AI Income Masterclass</strong>. Your payment has been received successfully.</p>
      <p>All session details including the date, time, and joining link will be shared inside our <strong>WhatsApp Community</strong>. Please join using the link below so you do not miss any updates.</p>
      <a class="cta" href="${waLink}">Join WhatsApp Community</a>
      <p>If you have any questions, feel free to reach out. We look forward to seeing you at the masterclass.</p>
      <p>Warm regards,<br/><strong>Geetanshu Chhabra</strong><br/>AI Income Masterclass</p>
    </div>
    <div class="footer">
      <p>You received this email because you enrolled in AI Income Masterclass.<br/>Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: '"Geetanshu Chhabra" <geetanshuchhabra123@gmail.com>',
      to,
      subject: subject || 'AI Income Masterclass - Enrollment Confirmed',
      html: htmlBody,
      text: `Thank you for enrolling in AI Income Masterclass. Join our WhatsApp Community here: ${waLink}`
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
