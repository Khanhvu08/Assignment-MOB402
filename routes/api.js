const express = require("express");
const router = express.Router();
const connect = require("./database");
const accountModel = require("../models/Account");
const productModel = require("../models/Product");

router.get("/users", async (req, res) => {
  await connect();
  const apiUsers = await accountModel.find().skip(1).lean();
  res.send(apiUsers);
});

router.get("/products", async (req, res) => {
  await connect();
  const apiProduct = await productModel.find().lean();
  res.send(apiProduct);
});

module.exports = router;
