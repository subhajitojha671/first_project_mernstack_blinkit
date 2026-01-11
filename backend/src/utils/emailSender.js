import nodemailer from "nodemailer";

export const sendEmailUtil = async ({ username, email, otp }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_MAIL, // your Gmail
        pass: process.env.SMTP_PASSWORD, // your App Password
      },
    });

    const mailOptions = {
      from: `"YourApp" <${process.env.SMTP_MAIL}>`,
      to: email, // 👈 this must be valid
      subject: "Your OTP Code",
      html: `<h3>Hello ${username},</h3>
             <p>Your OTP code is <b>${otp}</b></p>
             <p>This code is valid for 5 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};
