const mongoose = require('mongoose');
const config = require('../config');

async function connect() {
await mongoose.connect(config.uri);
}

module.exports =  connect ;