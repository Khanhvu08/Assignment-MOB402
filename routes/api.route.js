const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api.controller");
const middleware = require("../middleware/checkLogin")
router.get("/users",middleware.reqAuthenticated, apiController.listUser);

router.get("/products",middleware.reqAuthenticated, apiController.listProduct);

module.exports = router;
