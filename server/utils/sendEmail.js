const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (userMail, subiect, textEmail) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: userMail,
    subject: subiect,
    text: textEmail,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
