
const express = require('express');
const path = require('path');
const session = require('express-session');
const config = require('./config');
const port = 3000

const indexRouter = require('./routes/index')
const registerRouter = require('./routes/register')
const listRouter = require('./routes/listUser')
const apiRouter = require('./routes/api')
const app = express();

//view engine setup 
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname) + '/public'))



app.use(session({
    secret: config.sessionSecretKey,
    resave:true,
    saveUninitialized:true
}))
app.use('/',indexRouter);
app.use('/register',registerRouter);
app.use('/list',listRouter);
app.use('/api',apiRouter);





app.listen(port, (err) => {
    console.log(`Server is running at http://localhost:${port}`);
})




