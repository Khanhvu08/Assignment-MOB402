const myModel = require("../models/Product");
const fs = require("fs");
exports.renderProduct = async (req, res, next) => {
  let objProducts = await myModel.find();
  res.render("home/index", {  data: objProducts });
};
exports.updateProduct = async (req, res, next) => {
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
  if (!file) {
    const tempProduct = {
      productName,
      productPrice: Number(productPrice),
      productColor,
      productType,
      customerName,
    };
    await myModel.findByIdAndUpdate(tempID, tempProduct);
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
    await myModel.findByIdAndUpdate(tempID, tempProduct);
  }
  return res.redirect("/products");
};
exports.addProduct = async (req, res, next) => {
  const { productName, productPrice, productColor, productType, customerName } =
    req.body;
  const file = req.file;
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
  await myModel.collection.insertOne(tempProduct);
  res.redirect("/products");
};
exports.deleteProduct = async (req, res, next) => {
  const idObj = req.body;
  await myModel.findByIdAndRemove(idObj.id.trim());
  res.redirect("/products");
};
