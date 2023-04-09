const myModel = require("../models/Account");
const myModel1 = require("../models/Product");

exports.reqAuthenticated = (req, res, next) => {
  if (req.session.userLogin) {
    next();
  } else {
    return res.redirect("/");
  }
};

