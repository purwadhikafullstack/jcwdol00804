const jwt = require("jsonwebtoken");

module.exports = {
  createToken: (payload, expired = "24h") => {
    let token = jwt.sign(payload, "xmart!", {
      expiresIn: expired,
    });
    return token;
  },
  readToken: (req, res, next) => {
    jwt.verify(req.token, "xmart!", (err, decript) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Authenticate token failed",
        });
      }
      req.decript = decript;
      next();
    });
  },
};
