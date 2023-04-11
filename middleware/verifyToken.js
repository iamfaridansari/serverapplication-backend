const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(422).json({ message: "Authentication failed" });
  }
  try {
    const splitToken = token.split(" ")[1];
    const verified = jwt.verify(splitToken, process.env.secretkey);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = authentication;
