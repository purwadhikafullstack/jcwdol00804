const nodemailer = require("nodemailer");

module.exports = {
  transporter: nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  }),
};
