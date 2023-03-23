
const express = require('express');
const path = require('path');
const app = express();
const port = 3000
const fs = require('fs')
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname) + '/public'))


let arrUser = [
    { id: 1, name: 'Khanh', user: 'hihi123', password: '0112345678', img: 'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/zhongli/image.png?strip=all&quality=100&w=160' },
    { id: 2, name: 'Hùng', user: 'hihi124', password: '0112345678', img: 'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/zhongli/image.png?strip=all&quality=100&w=160' },
    { id: 3, name: 'Hoàng', user: 'hihi125', password: '0112345678', img: 'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/zhongli/image.png?strip=all&quality=100&w=160' },
    { id: 4, name: 'Long', user: 'hihi126', password: '0112345678', img: 'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/zhongli/image.png?strip=all&quality=100&w=160' },
    { id: 5, name: 'Hưng', user: 'hihi127', password: '0112345678', img: 'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/zhongli/image.png?strip=all&quality=100&w=160' }
]

let arrProduct = [
    { productId: 1, productName: 'Áo phao', productPrice: 100000, avatar: 'https://vitimex.com.vn/hinhanh/sanpham/ao-phao-long-vu-akn0123.jpg', productColor: 'Xám', productType: "Electronics", customerId: 101, customerName: "Vu Viet Khanh" },
    { productId: 2, productName: 'Quần kahi', productPrice: 100000, avatar: 'https://www.akmen.vn/images/2017/01/quan-kaki-xanh-bien-qk163-3555-p.jpg', productColor: 'Xám', productType: "Clothing", customerId: 102, customerName: "Vu Viet Khanh" },
    { productId: 3, productName: 'Áo Jean', productPrice: 100000, avatar: 'https://cf.shopee.vn/file/3bf98a971a93bda6053cac1c572247f9', productColor: 'Xám', productType: "Books", customerId: 103, customerName: "Vu Viet Khanh" },
    { productId: 4, productName: 'Quần âu', productPrice: 100000, avatar: 'https://360boutique.vn/wp-content/uploads/2021/04/QACTK203-1.jpg', productColor: 'Xám', productType: "Appliances", customerId: 104, customerName: "Vu Viet Khanh" },
    { productId: 5, productName: 'Áo khoác', productPrice: 100000, avatar: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/415/697/products/m0w2iuvv-1-1hxj-hinh-mat-truoc-0as.jpg', productColor: 'Xám', productType: "Toys", customerId: 105, customerName: "Vu Viet Khanh" },
]



app.get(['/', '/login'], function (req, res) {
    res.render('login', { title: "Helica Management", check: false })
})


app.get('/register', function (req, res) {
    res.render('register', { title: "Helica | Register" })
})
app.get('/index', function (req, res) {
    res.render('index', { title: "Trang chủ", data: arrProduct });
});
app.get('/list', function (req, res) {
    console.log(JSON.stringify(arrUser));
    res.render('list', { title: "Danh sách người dùng", data: arrUser });

})

app.post('/register', function (req, res) {
    const { email, password, fullName } = req.body
    const tempData = { email, password, fullName }
    fs.appendFile('account.txt', JSON.stringify(tempData) + '\n', function (err) {
        if (err) throw err;
        res.redirect('/login')
    });

})
app.post('/login', function (req, res, next) {
    const { usr, pwd } = req.body;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>LOGIN: " + usr, pwd);

    fs.readFile('account.txt', function (err, data) {
        const users = data.toString().split('\n').filter(Boolean).map(JSON.parse);
        const user = users.find(u => u.email === usr && u.password === pwd);
        if (user) {
            res.redirect('/index');
        } else {
            res.render('login', { title: "Helica Management", check: true })

        }
    });

})

app.listen(port, (err) => {
    console.log(`Server is running at http://localhost:${port}`);
})




