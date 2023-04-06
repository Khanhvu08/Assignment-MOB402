const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
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
    required: true
  },
});





const accountModel = mongoose.model("user", accountSchema);

module.exports =accountModel;

