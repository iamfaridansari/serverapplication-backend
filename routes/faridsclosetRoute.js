const router = require("express").Router();
const faridscloset = require("../model/faridsclosetSchema");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

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

module.exports = router;
