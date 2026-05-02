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
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>You're Enrolled!</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <!-- Preheader -->
  <div style="display:none;max-height:0;overflow:hidden;color:#f3f4f6;font-size:1px;">
    Your enrollment is confirmed. Join the WhatsApp community to get started.
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f3f4f6;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

          <!-- HEADER -->
          <tr>
            <td style="background:#0a0a0a;border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
              <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#f59e0b;">AI Income Masterclass</p>
              <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;line-height:1.2;">You're Successfully Enrolled!</h1>
              <p style="margin:12px 0 0;font-size:14px;color:rgba(255,255,255,0.55);line-height:1.6;">Payment confirmed &nbsp;·&nbsp; Welcome to the community</p>
            </td>
          </tr>

          <!-- GREEN TICK BANNER -->
          <tr>
            <td style="background:#f59e0b;padding:18px 40px;text-align:center;">
              <p style="margin:0;font-size:14px;font-weight:700;color:#0a0a0a;letter-spacing:0.01em;">
                ✓ &nbsp;Your payment has been received successfully
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;">

              <p style="margin:0 0 20px;font-size:16px;color:#111827;line-height:1.7;">Hi there,</p>

              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.8;">
                Welcome to the <strong style="color:#0a0a0a;">AI Income Masterclass</strong>! We are thrilled to have you on board. You have taken a great first step toward earning online using AI tools.
              </p>

              <!-- WHAT'S NEXT BOX -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;margin:0 0 28px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;">What happens next</p>

                    <!-- Step 1 -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
                      <tr>
                        <td width="32" valign="top">
                          <div style="width:28px;height:28px;background:#fef3c7;border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:800;color:#d97706;">1</div>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0;font-size:14px;color:#374151;line-height:1.65;"><strong style="color:#111827;">Join the WhatsApp Community</strong> using the button below — all masterclass content is shared there.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Step 2 -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
                      <tr>
                        <td width="32" valign="top">
                          <div style="width:28px;height:28px;background:#fef3c7;border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:800;color:#d97706;">2</div>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0;font-size:14px;color:#374151;line-height:1.65;">Look out for the <strong style="color:#111827;">welcome message</strong> inside the group — your masterclass journey starts there.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Step 3 -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="32" valign="top">
                          <div style="width:28px;height:28px;background:#fef3c7;border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:800;color:#d97706;">3</div>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0;font-size:14px;color:#374151;line-height:1.65;">Session <strong style="color:#111827;">date, time, and resources</strong> will be posted in the community — stay active to not miss anything.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA BUTTON -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
                <tr>
                  <td align="center">
                    <a href="${waLink}" target="_blank"
                      style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-size:15px;font-weight:800;padding:16px 36px;border-radius:100px;letter-spacing:0.01em;">
                      Join WhatsApp Community →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 28px;font-size:13px;color:#9ca3af;text-align:center;line-height:1.6;">
                This link is exclusively for enrolled students.<br/>Do not share it with others.
              </p>

              <hr style="border:none;border-top:1px solid #f3f4f6;margin:0 0 28px;" />

              <!-- SIGNATURE -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="52" valign="top">
                    <div style="width:48px;height:48px;background:#f59e0b;border-radius:50%;text-align:center;line-height:48px;font-size:16px;font-weight:900;color:#0a0a0a;letter-spacing:-1px;">GC</div>
                  </td>
                  <td style="padding-left:14px;" valign="middle">
                    <p style="margin:0;font-size:15px;font-weight:800;color:#0a0a0a;">Geetanshu Chhabra</p>
                    <p style="margin:3px 0 0;font-size:12px;color:#6b7280;font-weight:500;">AI Educator &amp; Digital Creator</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f9fafb;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;padding:22px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.8;">
                You received this email because you enrolled in <strong style="color:#6b7280;">AI Income Masterclass</strong>.<br/>
                Please do not reply to this email &nbsp;·&nbsp; <a href="mailto:geetanshuchhabra123@gmail.com" style="color:#f59e0b;text-decoration:none;">Contact Support</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

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
