const express = require("express");
const router = express.Router();
const accountModel = require("../models/Account");
const productModel = require("../models/Product");
const connect = require("./database");
const multer = require("multer");
const fs = require("fs");
const check = require("../middleware/checkLogin");
const { connection } = require("mongoose");
// Multer configuration
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("imgProduct");

router.get("/", function (req, res) {
  res.render("login", { title: "Helica Management", login: req.query.login });
});

router.post("/", async (req, res) => {
  const { usr, pwd } = req.body;
  await connect();
  //.lean()
  let objUser = await accountModel.findOne({
    email: usr,
  });
  if (objUser) {
    if (objUser.password === pwd) {
      req.session.userLogin = objUser;
      return res.redirect("/index");
    } else {
      return res.redirect("/?login=false");
    }
  } else {
    return res.redirect("/?login=null");
  }
});

router.get("/index", check.LoginReq, async (req, res) => {
  await connect();
  let arrProduct = await productModel.find();
  // ,msg:"Login Successfully"
  res.render("home/index", { title: "Helica Management", data: arrProduct });
});


router.post("/addProduct", upload, async (req, res) => {
  const { productName, productPrice, productColor, productType, customerName } =
    req.body;
  const file = req.file;
  console.log(file.path);
  // Đọc file nội dung ảnh
  const imageData = fs.readFileSync(file.path);
  // Chuyển đổi ảnh sang base64
  const base64Image = imageData.toString("base64");
  //xac dinh loại tệp JPG,PNG,GÌF
  const mimeType = file.mimetype;
  const base64 = `data:${mimeType};base64,${base64Image}`;
  const tempProduct = {
    productName,
    productPrice: Number(productPrice),
    imgProduct: base64,
    productColor,
    productType,
    customerName,
  };
  await connect();
  await productModel.collection.insertOne(tempProduct);
  res.redirect("/index");
});

router.post("/updateProduct", upload, async (req, res) => {
  const {
    id,
    productName,
    productPrice,
    productColor,
    productType,
    customerName,
  } = req.body;
  const tempID = id.trim();
  const file = req.file;
  await connect();
  if (!file) {
    const tempProduct = {
      productName,
      productPrice: Number(productPrice),
      productColor,
      productType,
      customerName,
    };
    await productModel.findByIdAndUpdate(tempID, tempProduct);
    return res.redirect("/index");
  } else {
    console.log(file.path);
    // Đọc file nội dung ảnh
    const imageData = fs.readFileSync(file.path);
    // Chuyển đổi ảnh sang base64
    const base64Image = imageData.toString("base64");
    //xac dinh loại tệp JPG,PNG,GÌF
    const mimeType = file.mimetype;
    const base64 = `data:${mimeType};base64,${base64Image}`;
    const tempProduct = {
      productName,
      productPrice: Number(productPrice),
      imgProduct: base64,
      productColor,
      productType,
      customerName,
    };
    await productModel.findByIdAndUpdate(tempID, tempProduct);
    return res.redirect("/index");
  }
});

router.post('/delProduct',async(req,res)=>{
  const idObj = req.body
  await connect();
  await productModel.findByIdAndRemove(idObj.id.trim())
  res.redirect("/index");
})






router.get('/logout',check.LoginReq,(req,res)=>{
  res.render("login", { title: "Helica Management", login: req.query.login });
})



module.exports = router;
