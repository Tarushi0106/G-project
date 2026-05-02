const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'geetanshuchhabra123@gmail.com',
    pass: 'znjr hqkh elhn oqsi'
  }
});

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, subject, whatsapp_link } = req.body;

  if (!to) {
    return res.status(400).json({ error: 'Recipient email required' });
  }

  try {
    await transporter.sendMail({
      from: '"Geetanshu Chhabra" <geetanshuuchhabra123@gmail.com>',
      to,
      subject: subject || 'AI Income Masterclass - Enrollment Confirmation',
      html: `
        <h2>Welcome to AI Income Masterclass!</h2>
        <p>Thank you for enrolling. Join our WhatsApp community for updates:</p>
        <p><a href="${whatsapp_link}">Join WhatsApp Group</a></p>
      `
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: error.message });
  }
};