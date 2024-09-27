const express = require("express"); // for creating the server and API
const mongoose = require("mongoose"); // for database connection
const jwt = require("jsonwebtoken"); // for token generation and verification
const multer = require("multer"); // for file upload
const path = require("path"); // for file upload
const cors = require("cors"); // for cross-origin requests(To provide access to our React project)
const dotenv = require("dotenv"); // for environment variables

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json()); //for parsing the incoming request with JSON payloads
app.use(cors());

//Database connection with mongoose

// mongoose.connect("mongodb+srv://yobudev:Yobu@2024@cluster0.9kqnjqb.mongodb.net/e-commerce")
mongoose
  .connect(
    "mongodb+srv://yobudev:Yobu%402024@cluster0.9kqnjqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection error: ", err));

//API creation

app.get("/", (req, res) => {
  res.send("Express App is running");
});

// Image Storage Engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//Creating Upload Endpoint for Images

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//Schema for Creating Products

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    requred: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

//Schema for User model

const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Creating endpoint for registering user
app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  let check = await Users.findOne({ email: email });

  if (check) {
    return res.status(400).json({
      success: false,
      errors: "User already exists. Try signing up with a differeent email ID",
    });
  }
  let cart = {};
  for (let i = 0; i <= 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    username: username,
    email: email,
    password: password,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");

  res.json({ success: true, token });
});

//Creating endpoint for user login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await Users.findOne({ email: email });
  if (user) {
    const passCompare = password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong email address" });
  }
});

app.post("/addproduct", async (req, res) => {
  //Logic to automatically update the id by getting hold of the last product
  // id in the array and incrementing it by one for the next product id
  try {
    let products = await Product.find({}); //Returns an array of existing products
    let id;

    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }

    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    console.log(product);
    await product.save();
    console.log("Product has been successfully saved to the Database");

    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: "Failed to add product",
    });
  }
});

//Creating API for deleting products

app.post("/removeproduct", async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Product has been successfully removed from the Database");
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: "Failed to remove product",
    });
  }
});

//Creating API for getting all the products

app.get("/allproducts", async (req, res) => {
  try {
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch products",
    });
  }
});

//Creating endpoint for newcollection data

app.get("/newcollection", async (req, res) => {
  try {
    // Separate the products into categories
    let womenProducts = await Product.find({ category: "women" });
    let menProducts = await Product.find({ category: "men" });
    let kidsProducts = await Product.find({ category: "kid" });

    // Select 4 from women, 2 from men, and 2 from kids
    let newCollection = [
      ...womenProducts.slice(0, 4),
      ...menProducts.slice(0, 2),
      ...kidsProducts.slice(0, 2),
    ];
    console.log("newcollection fetched");
    res.send(newCollection);
  } catch (err) {
    console.log(err);
    res.send("Failet to fetch products");
  }
});

//Creating endpoint for popular products data
app.get("/popularinwomen", async (req, res) => {
  try {
    let products = await Product.find({});

    let popularInWomen = products.slice(4, 8);

    res.send(popularInWomen);
    console.log("Popular products fetched");
  } catch (err) {
    console.err("Failed to fetch popular products");
  }
});

//Creating Middleware to fetch user

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (err) {
      res.status(401).send({ errors: "Please authenticate using valid token" });
    }
  }
};

//Creating endpoint for adding products to cartData
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added");
});

//Creating endpoint to remove product from cartdata

app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);

  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
  }
  res.send("Reomved");
});

//Creating endpoint to get cartdata

app.post("/getcart", fetchUser, async (req, res) => {
  console.log("getCart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log("Error:" + err);
  }
});
