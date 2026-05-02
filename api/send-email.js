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
      from: '"Geetanshu Chhabra" <geetanshuchhabra123@gmail.com>',
      to,
      subject: subject || 'AI Income Masterclass - Enrollment Confirmation',
      html: `
        <h2>You're Successfully Enrolled! 🎉</h2>
        <p>All the important updates, including <strong>date, time, and joining details</strong>, will be shared inside our WhatsApp Community.</p>
        <p>👉 Please join the community using the link below to stay updated and avoid missing anything.</p>
        <p>📲 <a href="${whatsapp_link}">Join Here: ${whatsapp_link}</a></p>
        <p>We're excited to have you onboard — see you inside!</p>
        <p>— Geetanshu Chhabra<br>AI Income Masterclass</p>
      `
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: error.message });
  }
};