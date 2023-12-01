const express = require('express');
const bodyParser = require('body-parser')
const urlparser = bodyParser.urlencoded({extended: false});

const Sequelize = require('sequelize');
const app = express();


const sequelize = new Sequelize("shop", "root", "", {
    dialect: 'mysql',
    host: 'localhost',
});


const Products = sequelize.define("products", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    count: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

app.set("view engine", "hbs");

let products = [
    {id: 1, name: 'хлеб', count: 12, price: 44},
    {id: 2, name: 'молоко', count: 126, price: 30},
    {id: 3, name: 'сок', count: 16, price: 60},
];

app.get('/products', function (req, res){
    console.log('продукты');
    Products.findAll({raw: true}).then((data) => {
        res.render("products.hbs", {products: data});
    });

})

app.post('/products', urlparser, function (req, res){

    const name =req.body.name;
    const count =req.body.count;
    const price =req.body.price;

    console.log(req.body);

    Products.create({name: name, count: count, price: price}).then(() => {
        res.redirect('/products');
    })
    


})

app.get('/product/:id', function (req, res){
    const productId = req.params.id;

    Products.findOne({where: { id: productId }}).then((data) => {
        res.render("product.hbs", {product: data});
    })
    
});


//Удаление
app.get('/delete/:id', function (req, res){
    const productId = req.params.id;
    Products.destroy({
        where: {
            id: productId
        }
    }).then(() => {
        res.redirect('/products');
    })
});

//Редактирование
app.get('/update/:id', function (req, res){
    console.log('Апдейт');
    Products.findOne({
        where: {
            id: req.params.id
        }
    }).then((data) => {
        res.render('update.hbs', {product: data});
    })

});


app.post('/update', urlparser, function (req, res){
    console.log("UPDATE!!!");
    let id = req.body.id;
    let name = req.body.name;
    let count = req.body.count;
    let price = req.body.price;
    console.log("1");
    Products.update({name: name, count: count, price: price}, {
        where: {
            id: id
        }
    }).then(() => {
        console.log("2");
        res.redirect('/update/'+id);
    })
});

app.get('/', function (req, res){
    res.render("index.hbs", {name: 'Alica'})
});

sequelize.sync().then(() => {
    app.listen('3000');
})


