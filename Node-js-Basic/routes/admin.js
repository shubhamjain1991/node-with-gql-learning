const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

router.get('/manage-products' ,productsController.manageProduct)

router.get('/edit-product' , productsController.editProduct)

router.post('/delete-product' , productsController.deleteProduct)

module.exports = router;
