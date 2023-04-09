const myModel = require("../models/Account");
const fs = require("fs");
const bcrypt = require("bcrypt"); //thu vien ma hoa password
exports.renderRegister = async (req, res, next) => {
  if (req.method === "POST") {
    const { email, fullName, password } = req.body;
    const file = req.file;
    const imageData = fs.readFileSync(file.path);
    // Chuyển đổi ảnh sang base64
    const base64Image = imageData.toString("base64");
    //xac dinh loại tệp JPG,PNG,GÌF
    const mimeType = file.mimetype;
    const base64 = `data:${mimeType};base64,${base64Image}`;
    //xử lý mã hoá passwords
    //B1. Tạo chuỗi mã bí mật
    const salt = await bcrypt.genSalt(10);
    let tempPwd = await bcrypt.hash(password, salt);
    const tempUser = {
      email,
      password: tempPwd,
      fullName,
      avatar: base64,
    };
    await myModel.collection.insertOne(tempUser);
    return res.redirect("/");
  }
  res.render("register");
};
// 
exports.renderLogin = async (req, res, next) => {
  if (req.method === "POST") {
    const { usr, pwd } = req.body;
    try {
      const user = await myModel.findOne({ email: usr });
      if (user) {
        const isMatch = await bcrypt.compare(pwd, user.password);
        if (isMatch) {
          req.session.userLogin = user;
          if (usr !== "ad@min.com") {
            return res.render("user", { data: user });
          } else {
            return res.redirect("/products");
          }
        } else {
          return res.redirect("/?login=false");
        }
      } else {
        return res.redirect("/?login=null");
      }
    } catch (e) {
      console.log(e);
    }
  }
  res.render("login", { login: req.query.login });
};

exports.renderLogout = (req, res, next) => {
  if (req.session != null)
    req.session.destroy(() => {
      res.redirect("/");
    });
};

exports.renderUser = async (req, res, next) => {
  let objUsers = await myModel.find();
  console.log(objUsers.email);
  res.render("home/list", { data: objUsers });
};

exports.addUser = async (req, res, next) => {
  const { email, fullName, password } = req.body;
  const file = req.file;
  const imageData = fs.readFileSync(file.path);
  // Chuyển đổi ảnh sang base64
  const base64Image = imageData.toString("base64");
  //xac dinh loại tệp JPG,PNG,GÌF
  const mimeType = file.mimetype;
  const base64 = `data:${mimeType};base64,${base64Image}`;
  //xử lý mã hoá passwords
  //B1. Tạo chuỗi mã bí mật
  const salt = await bcrypt.genSalt(10);
  let tempPwd = await bcrypt.hash(password, salt);
  const tempUser = {
    email,
    password: tempPwd,
    fullName,
    avatar: base64,
    role,
  };
  await myModel.collection.insertOne(tempUser);
  return res.redirect("/users");
};

exports.deleteUser = async (req, res, next) => {
  const idObj = req.body;
  await myModel.findByIdAndRemove(idObj.id.trim());
  res.redirect("/users");
};
exports.renderIsNotAdmin = async (req, res, next) => {
  const { usr } = req.body;
  let obj = await myModel.find({ email: usr });
  return res.render("user", { data: obj });
};
exports.updateUser = async (req, res, next) => {
  const { id, email, fullName, password } = req.body;
  const file = req.file;
  const tempID = id.trim();
  //xử lý mã hoá passwords
  //B1. Tạo chuỗi mã bí mật
  const salt = await bcrypt.genSalt(10);
  let tempPwd = await bcrypt.hash(password, salt);
  if (!file) {
    const tempUser = {
      email,
      password: tempPwd,
      fullName,
    };
    await myModel.findByIdAndUpdate(tempID, tempUser);
  } else {
    const imageData = fs.readFileSync(file.path);
    // Chuyển đổi ảnh sang base64
    const base64Image = imageData.toString("base64");
    //xac dinh loại tệp JPG,PNG,GÌF
    const mimeType = file.mimetype;
    const base64 = `data:${mimeType};base64,${base64Image}`;

    const tempUser = {
      email,
      password: tempPwd,
      fullName,
      avatar: base64,
    };
    await myModel.findByIdAndUpdate(tempID, tempUser);
  }
  return res.redirect("/users");
};
