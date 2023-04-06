const express = require('express');
const router = express.Router()
const connect = require("./database");
const accountModel = require('../models/Account')
const checkLogin=require('../middleware/checkLogin')
router.get('/',checkLogin.LoginReq, async (req,res)=>{
    await connect();
    let arrAccount = await accountModel.find();
    // ,msg:"Login Successfully"
    res.render("home/list", { title: "Helica Management", data: arrAccount });
})

module.exports=router;