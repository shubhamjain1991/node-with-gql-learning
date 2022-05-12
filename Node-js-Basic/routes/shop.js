const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.index);

router.get('/products' , productsController.getProducts)

router.get('/cart' , productsController.getCart)

router.post('/cart' , productsController.addToCart)

router.get('/orders' , productsController.myOrders)

router.get('/product/:productId/details' , productsController.getProductDetails)

router.post('/cart/item/:itemId/remove' , productsController.updateCart)


module.exports = router;
