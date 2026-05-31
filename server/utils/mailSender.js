import nodemailer from 'nodemailer';

/**
 * Sends a structured, styled HTML contact email to the portfolio owner.
 * @param {Object} details
 * @param {string} details.name - Visitor's name
 * @param {string} details.email - Visitor's email
 * @param {string} details.subject - Submission subject
 * @param {string} details.message - Submission message
 * @returns {Promise<Object>} Send email result promise
 */
export const sendMail = async ({ name, email, subject, message }) => {
  // Create transporter with Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC';

  // Email payload configuration
  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`, // Sent via auth Gmail account
    to: process.env.RECEIVER_EMAIL,
    replyTo: email, // Direct replies will go to the sender
    subject: subject || 'New Portfolio Contact Form Submission',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New contact Form Submission</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #0d0d0f;
            color: #f3f4f6;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .wrapper {
            background-color: #070708;
            padding: 40px 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #0d0d0f;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          }
          .header {
            background: linear-gradient(135deg, #0070f3, #7928ca);
            padding: 35px 30px;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #ffffff;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }
          .content {
            padding: 40px 30px;
          }
          .field {
            margin-bottom: 25px;
          }
          .label {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            color: #a1a1aa;
            margin-bottom: 6px;
            letter-spacing: 1.5px;
          }
          .value {
            font-size: 15px;
            color: #f3f4f6;
            line-height: 1.5;
          }
          .value a {
            color: #0070f3;
            text-decoration: none;
            font-weight: 600;
          }
          .value-box {
            background-color: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-left: 4px solid #7928ca;
            padding: 20px;
            border-radius: 8px;
            font-size: 14px;
            line-height: 1.6;
            color: #e4e4e7;
            white-space: pre-wrap;
          }
          .footer {
            background-color: rgba(255, 255, 255, 0.01);
            padding: 20px 30px;
            text-align: center;
            font-size: 11px;
            color: #71717a;
            border-top: 1px solid rgba(255, 255, 255, 0.03);
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <h1>Portfolio Contact</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Sender Name</div>
                <div class="value" style="font-weight: 600;">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Subject</div>
                <div class="value" style="color: #ffffff; font-weight: 500;">${subject}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="value-box">${message}</div>
              </div>
              <div class="field" style="margin-bottom: 0;">
                <div class="label">Submission Time</div>
                <div class="value" style="font-size: 13px; color: #71717a;">${timestamp}</div>
              </div>
            </div>
            <div class="footer">
              This message was sent securely from the portfolio portal contact system.
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return await transporter.sendMail(mailOptions);
};
