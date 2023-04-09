const database = require("./database");
const accountSchema = new database.mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },

  fullName: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    required: true,
  },
 
});

const accountModel = database.mongoose.model("user", accountSchema);


module.exports =  accountModel ;




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