const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.index);

router.get('/products' , productsController.getProducts)

router.get('/cart' , productsController.getCart)

router.get('/orders' , productsController.myOrders)


module.exports = router;
