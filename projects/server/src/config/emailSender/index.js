const { transporter } = require("./transporter");
const { mailOptions } = require("./mailOptions");

const sendEmail = (email) => {
  transporter.sendMail({ ...mailOptions(email), to: email }, (err) => {
    if (err) {
      console.log("it has an error", err);
    } else {
      console.log(`email has been sent to ${email}`);
    }
  });
};

exports.sendEmail = sendEmail;
