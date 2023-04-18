module.exports = {
  mailOptions: function (email) {
    return {
      from: "xmart.shop8@gmail.com",
      subject: "Email Verification",
      text: `Click this link to verify your email http://localhost:3000/verify-email?email=${email}`,
    };
  },
};
