
const express = require('express');
const path = require('path');
const session = require('express-session');
const port = 3000
require("dotenv").config();
const userRoute = require('./routes/user.route')
const indexRoute = require('./routes/index.route.js')
const productRoute = require('./routes/product.route')
const apiRoute = require('./routes/api.route')
const app = express();

//view engine setup 
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname) + '/public'))


app.use(session({
    secret: process.env.SECRET_SESSION_KEY,
    resave:true,
    saveUninitialized:true
}))
app.use('/',indexRoute);
app.use('/products',productRoute);
app.use('/users',userRoute);
app.use('/api',apiRoute);





app.listen(port, (err) => {
    console.log(`Server is running at http://localhost:${port}`);
})




