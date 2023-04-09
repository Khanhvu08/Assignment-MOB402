const express = require("express");
const router = express.Router();
const controller = require('../controllers/user.controller')
const middleware = require('../middleware/checkLogin')
const upload =require('../Utils/upload')


router.get('/',middleware.reqAuthenticated,controller.renderUser)
router.post('/addUser',upload.single("avatar"),controller.addUser)
router.post('/updateUser',upload.single("avatar"),controller.updateUser)
router.post('/deleteUser',controller.deleteUser)



module.exports = router;

