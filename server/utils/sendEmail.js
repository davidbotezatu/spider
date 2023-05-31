const nodemailer = require("nodemailer");
require("dotenv").config;

const sendEmail = (userMail, pass) => {
  const subjectNewUser = "Utilizator creat";
  const mailTextNewUser =
    "Felicitari, noul tau cont a fost creat cu succes. Parola ta este: " + pass;

  const subjectChangePass = "Parola schimbata";
  const mailTextChangePass =
    "Felicitari, parola ta a fost schimbata cu succes.";

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
    subject: pass ? subjectNewUser : subjectChangePass,
    text: pass ? mailTextNewUser : mailTextChangePass,
  };

  transporter.sendMail(mailOptions, function (error) {
    error && console.log(error);
  });
};

module.exports = sendEmail;
