const express = require('express');
const app = express();

app.set("view engine", "hbs");

let products = [
    {id: 1, name: 'хлеб', count: 12, price: 44},
    {id: 2, name: 'молоко', count: 126, price: 30},
    {id: 3, name: 'сок', count: 16, price: 60},
];

app.get('/products.hbs', function (req, res){
    res.render("products.hbs", {products: products})
})

app.get('/product/:id', function (req, res){
    const productId = req.params.id
    res.render("product.hbs", {product: products[productId-1]})
})

app.get('/', function (req, res){
    res.render("index.hbs", {name: 'Alica'})
});
app.listen(3000)
