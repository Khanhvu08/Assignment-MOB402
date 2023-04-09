const database = require('./database');
const productSchema = new database.mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },
  productPrice: {
    type: Number,
    require: true,
  },
  imgProduct: {
    type: String,
    required: true
  },
  productColor: {
    type: String,
    require: true,
  },
  productType:{
    type: String,
    require: true,
  },
  customerName:{
    type: String,
    require: true,
  }
});





const productModel = database.mongoose.model("product", productSchema);

module.exports =productModel;

