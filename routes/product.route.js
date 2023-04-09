const express = require('express');
const router = express.Router()
const controller = require('../controllers/product.controller')
const middleware = require('../middleware/checkLogin')
const upload =require('../Utils/upload')


router.get('/',middleware.reqAuthenticated,controller.renderProduct)
router.post('/updateProduct',upload.single("imgProduct"),controller.updateProduct);
router.post('/addProduct',upload.single("imgProduct"),controller.addProduct);
router.post('/delProduct',controller.deleteProduct)

module.exports=router;