import { transporter } from "../configs/mailer";

const templates = {
  resetPassword: (otp) => ({
    subject: "Your Password OTP - Campus Flow",
    html: `<div style="font-family: sans-serif;">
    <h2> Password Reset Request </h2>
    <p>Use this OTP to reset your password:</p>
    <h1 style='letter-spacing: 4px;'>${otp}</h1>
    <p>Expires in 10 minutes.</p>
    </div>`
  }),
  welcome: (name) => ({
    subject: 'Welcome to Campus Flow',
    html: `<h1> Hey ${name}</h1>`
  })
}

export const sendEmail = async (to, templateName, data) => {
  const { subject, html } = templates[templateName](data)

  await transporter.sendMail({
    from: `"Campus Flow" <${process.env.GMAIL_USER}>`,
    to, subject, html
  })
}