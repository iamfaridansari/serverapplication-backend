const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(422).json({ message: "Authentication failed" });
  }
  try {
    const verified = jwt.verify(token, process.env.secretkey);
    console.log(verified);
    next();
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = authentication;
