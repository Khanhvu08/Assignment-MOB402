const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL).catch(err => console.log(err))
module.exports = { mongoose }; 