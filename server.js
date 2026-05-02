const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
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

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  if (req.method === 'POST' && parsedUrl.pathname === '/api/send-email') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { to, subject, whatsapp_link } = JSON.parse(body);
        if (!to) return res.end(JSON.stringify({ error: 'Recipient email required' }));
        
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
        
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.end(JSON.stringify({ error: e.message }));
      }
    });
  } else {
    let filePath = '.' + (parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname);
    const ext = path.extname(filePath);
    const map = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end('Not found');
      }
      res.writeHead(200, { 'Content-Type': map[ext] || 'text/plain' });
      res.end(data);
    });
  }
});

server.listen(8000, () => console.log('Server running on http://localhost:8000'));