const router = require("express").Router();
const nightsuitproducts = require("../model/nightsuitSchema");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
const multipleUpload = upload.fields([
  { name: "image1" },
  { name: "image2" },
  { name: "image3" },
  { name: "image4" },
]);

router.post(
  "/api/post/nightsuit/products",
  multipleUpload,
  async (req, res) => {
    const { name, category, mrp, price, color, fabric } = req.body;
    const images = Object.values(req.files).flat(1);
    if (!name || !category || !mrp || !price || !color || !fabric) {
      return res.status(422).json({ message: "Enter complete details" });
    } else {
      try {
        const newnightsuitproducts = new nightsuitproducts({
          name,
          category,
          mrp,
          price,
          color,
          fabric,
          images,
        });
        await newnightsuitproducts.save();
        res.status(200).json({ message: "Product saved" });
      } catch (error) {
        console.log(error);
      }
    }
  }
);

//
router.get("/api/get/nightsuit/products", async (req, res) => {
  const products = await nightsuitproducts.find();
  try {
    if (products) {
      res.status(200).json(products);
    }
  } catch (error) {
    console.log(error);
  }
});

//
router.post("/api/delete/nightsuit/products", async (req, res) => {
  const { id } = req.body;
  await nightsuitproducts.findByIdAndDelete(id);
  res.status(200).json({ message: "Product deleted" });
});

module.exports = router;
