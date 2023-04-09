const accountModel = require("../models/Account");
const productModel = require("../models/Product");
exports.listUser = async (req, res, next) => {
  const apiUsers = await accountModel.find().skip(1).lean();
  res.send(apiUsers);
};
exports.listProduct = async (req, res, next) => {
  const apiProduct = await productModel.find().lean();
  res.send(apiProduct);
};
