const router = require("express").Router();
const {
  faridscloset,
  faridsclosetuser,
} = require("../model/faridsclosetSchema");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
const jwt = require("jsonwebtoken");
const authentication = require("../middleware/verifyToken");

router.post(
  "/api/post/faridscloset/products",
  upload.single("image"),
  async (req, res) => {
    const { name, price, color, brand, category } = req.body;
    const image = req.file.path;
    if (!name || !price || !color || !brand || !category || !image) {
      return res.status(422).json({ message: "Enter complete details" });
    } else {
      try {
        const newProduct = new faridscloset({
          name,
          price,
          color,
          brand,
          category,
          image,
        });
        await newProduct.save();
        res.status(200).json({ message: "Product saved" });
      } catch (error) {
        console.log(error);
      }
    }
  }
);

router.get("/api/get/faridscloset/products", async (req, res) => {
  try {
    const products = await faridscloset.find();
    if (products) {
      res.status(200).json(products);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/delete/faridscloset/products", async (req, res) => {
  const { id } = req.body;
  try {
    const deletedproduct = await faridscloset.findByIdAndDelete(id);
    if (deletedproduct) {
      res.status(200).json({ message: "Product deleted" });
    }
  } catch (error) {
    console.log(error);
  }
});

//
router.post("/api/signup/faridcloset/user", async (req, res) => {
  const { name, email, mobile, password } = req.body;
  if (!name || !email || !mobile || !password) {
    return res.status(422).json({ message: "Enter complete details" });
  }
  //
  try {
    const userExist = await faridsclosetuser.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ message: "Email address already in use." });
    } else {
      const newUser = new faridsclosetuser({ name, email, mobile, password });
      await newUser.save();
      res
        .status(200)
        .json({ message: "Account created. Please login to continue." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//
router.post("/api/login/faridcloset/user", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ message: "Enter complete details" });
  } else {
    try {
      const userExist = await faridsclosetuser.findOne({ email: email });
      if (!userExist) {
        return res.status(422).json({ message: "Account not found" });
      }
      if (userExist) {
        if (userExist.password === password) {
          const token = jwt.sign({ id: userExist.id }, process.env.secretkey);
          res.cookie("faridclosetuser", token, {
            httpOnly: true,
          });
          res.status(200).json({ message: "Login successful", token: token });
        } else {
          return res.status(422).json({ message: "Login failed" });
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

router.get("/api/get/faridcloset/user", authentication, async (req, res) => {
  try {
    if (req.user) {
      const userExist = await faridsclosetuser.findById(req.user.id);
      const { password, ...others } = userExist._doc;
      res.status(200).json(others);
    } else {
      return res.status(422).json("Authentication failed");
    }
  } catch (error) {
    res.status(500).json("Authentication failed");
  }
});

module.exports = router;
