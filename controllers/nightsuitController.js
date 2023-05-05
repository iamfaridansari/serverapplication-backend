const {
  nightsuitproducts,
  nightsuituser,
  nightsuitcoupon,
} = require("../model/nightsuitSchema");
const jwt = require("jsonwebtoken");

// post products
const postProducts = async (req, res) => {
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
};

// get products
const getProducts = async (req, res) => {
  const products = await nightsuitproducts.find();
  try {
    if (products) {
      res.status(200).json(products);
    }
  } catch (error) {
    console.log(error);
  }
};
// delete product
const deleteProduct = async (req, res) => {
  const { id } = req.body;
  await nightsuitproducts.findByIdAndDelete(id);
  res.status(200).json({ message: "Product deleted" });
};

// view product
const viewProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await nightsuitproducts.findOne({ _id: id });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

// user signup
const userSignup = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  if (!name || !email || !mobile || !password) {
    return res.status(422).json({ message: "Enter complete details" });
  }
  const userExist = await nightsuituser.findOne({
    email: email,
  });
  if (userExist) {
    return res.status(422).json({ message: "Email already in use" });
  } else {
    try {
      const newuser = new nightsuituser({ name, email, mobile, password });
      await newuser.save();
      res
        .status(200)
        .json({ message: "Account created. Please login to continue" });
    } catch (error) {
      console.log(error);
    }
  }
};

// user login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ message: "Enter complete details" });
  }
  try {
    const userExist = await nightsuituser.findOne({ email: email });
    if (!userExist) {
      return res.status(422).json({ message: "User does not exist" });
    } else {
      if (userExist.password !== password) {
        return res.status(422).json({ message: "Incorrect credentials" });
      } else {
        const token = jwt.sign({ id: userExist._id }, process.env.secretkey);
        return res
          .status(200)
          .json({ message: "Login successful", token: token });
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// auth user
const authUser = async (req, res) => {
  try {
    if (req.user) {
      const userExist = await nightsuituser.findById(req.user.id);
      const { password, ...others } = userExist._doc;
      res.status(200).json(others);
    } else {
      return res.status(422).json("Authentication failed");
    }
  } catch (error) {
    res.status(500).json("Authentication failed");
  }
};

// post address
const postAddress = async (req, res) => {
  const { email, token, house, state, city, landmark, pincode } = req.body;
  const userExist = await nightsuituser.findOne({ email: email });
  if (!email || !token) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Please login.1" });
  }
  if (!userExist) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Please login.2" });
  }
  if (userExist.token !== token) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Please login.3" });
  } else {
    if (!house || !state || !city || !pincode) {
      return res.status(422).json({ message: "Enter complete details" });
    } else {
      try {
        const newAddress = await userExist.postAddress(
          email,
          house,
          state,
          city,
          landmark,
          pincode
        );
        res.status(200).json({ message: "Address saved", address: newAddress });
      } catch (error) {
        console.log(error);
      }
    }
  }
};

// get address
const getAddress = async (req, res) => {
  const { email, token } = req.body;
  const userExist = await nightsuituser.findOne({ email: email });
  if (!email || !token) {
    return res.status(401).json({ message: "Please login to add address." });
  }
  if (!userExist) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Please login to get address." });
  }
  if (userExist.token !== token) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Please login to get address." });
  } else {
    try {
      res.status(200).json(userExist);
    } catch (error) {
      console.log(error);
    }
  }
};

// delete address
const deleteAddress = async (req, res) => {
  const { email, house } = req.body;
  const userExist = await nightsuituser.findOne({ email: email });
  const filtered = userExist.address.filter((item) => {
    return (
      item.house.replace(/\s/g, "").toLowerCase() !==
      house.replace(/\s/g, "").toLowerCase()
    );
  });
  const updated = await userExist.deleteAddress(filtered);
  res.status(200).json({ message: "Äddress deleted" });
};

// post coupon
const postCoupon = async (req, res) => {
  const { name, discount, type } = req.body;
  if (!name || !discount || !type) {
    return res.status(422).json({ message: "Enter complete details" });
  } else {
    try {
      const newCoupon = new nightsuitcoupon({ name, discount, type });
      await newCoupon.save();
      res.status(200).json({ message: "Coupon saved" });
    } catch (error) {
      console.log(error);
    }
  }
};

// get coupon
const getCoupon = async (req, res) => {
  try {
    const couponList = await nightsuitcoupon.find();
    if (couponList) {
      res.status(200).json(couponList);
    }
  } catch (error) {
    console.log(error);
  }
};

// delete coupon
const deleteCoupon = async (req, res) => {
  const { id } = req.body;
  try {
    await nightsuitcoupon.findByIdAndDelete(id);
    res.status(200).json({ message: "Coupon deleted" });
  } catch (error) {}
};

// apply coupon
const applyCoupon = async (req, res) => {
  const { coupon, subtotal } = req.body;
  //
  let newSubTotal = 0;
  if (!coupon || !subtotal) {
    return res.status(422).json({ message: "Failed to apply coupon" });
  }
  if (subtotal < 500) {
    return res
      .status(422)
      .json({ message: "Coupon applicable on orders above 499 only" });
  }
  //
  const couponExist = await nightsuitcoupon.findOne({ name: coupon });
  if (!couponExist) {
    return res.status(422).json({ message: "Invalid coupon" });
  }
  if (couponExist) {
    if (couponExist.name === coupon && couponExist.type === "rupees") {
      newSubTotal = subtotal - couponExist.discount;
    } else if (couponExist.name === coupon && couponExist.type === "percent") {
      newSubTotal = Math.round(
        subtotal - (subtotal * couponExist.discount) / 100
      );
    }
    res.status(200).json({
      message: "Coupon applied",
      coupon: coupon,
      subtotal: newSubTotal,
    });
  }
};

module.exports = {
  postProducts,
  getProducts,
  deleteProduct,
  viewProduct,
  userSignup,
  userLogin,
  authUser,
  postAddress,
  getAddress,
  deleteAddress,
  postCoupon,
  getCoupon,
  deleteCoupon,
  applyCoupon,
};
