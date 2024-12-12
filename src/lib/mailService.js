const nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export async function sendMail({subject, to, text, html}) {
	//return ({subject, toEmail, otpText})
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // service: "smtp.hostinger.com",
    // port: 465 , //add port
    secure: true, // upgrade later with STARTTLS
    // debug: true,
    // logger: true, // log information in console  **NEW**
    from: process.env.NODEMAILER_EMAIL,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });


  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to, subject, text, html
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error(error);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}