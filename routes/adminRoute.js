const router = require("express").Router();
const authentication = require("../middleware/verifyToken");
const admin = require("../model/adminSchema");
const jwt = require("jsonwebtoken");

router.post("/api/post/admin/signup", async (req, res) => {
  const { username, password, secretkey } = req.body;
  if (!username || !password || !secretkey) {
    return res.status(422).json({ message: "Enter complete details" });
  }
  try {
    if (secretkey !== process.env.secretkey) {
      return res.status(422).json({ message: "Authentication failed" });
    } else {
      const newAdmin = new admin({
        username,
        password,
      });
      await newAdmin.save();
      res.status(200).json({ message: "Admin account created successfully" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/api/post/admin/login", async (req, res) => {
  const { username, password, secretkey } = req.body;
  if (!username || !password || !secretkey) {
    return res.status(422).json({ message: "Enter complete details" });
  }
  try {
    if (secretkey !== process.env.secretkey) {
      return res.status(422).json({ message: "Authentication failed" });
    } else {
      const adminExist = await admin.findOne({ username: username });
      if (!adminExist) {
        return res.status(422).json({ message: "User not found" });
      } else {
        if (password !== adminExist.password) {
          return res
            .status(422)
            .json({ message: "Invalid username or password" });
        } else {
          const { password, secretkey, ...others } = adminExist._doc;
          const token = jwt.sign(
            { id: adminExist._id },
            process.env.secretkey,
            {
              expiresIn: "1d",
            }
          );
          res
            .status(200)
            .header("auth-token", token)
            .json({ response: others, token: token });
        }
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/auth", authentication, (req, res) => {
  try {
    if (req.user) {
      res.status(200).json("Authentication successful");
    } else {
      return res.status(422).json("Authentication failed");
    }
  } catch (error) {
    res.status(500).json("Authentication failed");
  }
});

module.exports = router;
