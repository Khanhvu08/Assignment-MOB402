const express = require("express");
const router = express.Router();
const multer = require("multer");
const accountModel = require("../models/Account");
const  connect = require('./database');
const fs = require("fs");

// Multer configuration
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("avatar");

router.get("/register", (req, res) => {
  res.render("register", { title: "Helica | Register" });
});

router.post("/regUser", upload, async (req, res) => {
    const { email, fullName, password } = req.body;
    const file = req.file;
    // Đọc file nội dung ảnh
    const imageData = fs.readFileSync(file.path);
    // Chuyển đổi ảnh sang base64
    const base64Image = imageData.toString("base64");
    //xac dinh loại tệp JPG,PNG,GÌF
    const mimeType = file.mimetype;
    const base64 = `data:${mimeType};base64,${base64Image}`;
    const tempUser = {
        email,
        password,
        fullName,
        avatar:base64
    }
    await connect();
    await accountModel.collection.insertOne(tempUser);
    res.redirect('/')
});
module.exports = router;

