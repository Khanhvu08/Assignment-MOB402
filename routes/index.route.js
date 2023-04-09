const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require('../controllers/user.controller')
const middleware = require('../middleware/checkLogin')
const upload =require('../Utils/upload')
const myModel=require('../models/Account')

router.get('/',controller.renderLogin)
router.post('/',controller.renderLogin)
router.get('/register',controller.renderRegister)
router.post("/register", upload.single("avatar"), controller.renderRegister);
router.get('/logout',middleware.reqAuthenticated,controller.renderLogout)




module.exports = router;

