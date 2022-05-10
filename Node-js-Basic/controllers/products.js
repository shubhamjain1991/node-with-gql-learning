const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title , req.body.imageUrl,req.body.description , req.body.price);
  product.save();
  res.redirect('/products');
};

exports.updateProduct = (req , res , next) =>{
  console.log('updaint ' , req.params.productId , res.body );
  const productId = req.params.productId;
  const product = new Product(req.body.title , req.body.imageUrl,req.body.description , req.body.price);
  product.id = productId;
  product.updateProductById();
  res.redirect('/products')

}

exports.editProduct = (req,res,next) =>{
  const productId = req.params.productId;
  const editMode = req.query.edit;
  console.log("productId" , productId , "edit" , editMode)
  Product.fetchById(product => {
    res.render('admin/edit-product' , {
      product: product,
      pageTitle: 'Edit Product',
      path: '/endusers/edit-product',
      hasProducts: product.length > 0,
      activeShop: true,
      productCSS: true
    })
  } , productId)
}

exports.deleteProduct = (req,res,next) =>{
    res.redirect('/products')
}

exports.getProductDetails = (req , res ,next) =>{
  product_id = req.params.productId
  Product.fetchById(product => {
    res.render('endusers/product-details' , {
      product: product,
      pageTitle: 'Product Details',
      path: '/endusers/product-details',
      hasProducts: product.length > 0,
      activeShop: true,
      productCSS: true
    })
  } , product_id) 
}

exports.manageProduct = (req ,res , next) =>{
  Product.fetchAll(products => {
    res.render('admin/manage-products', {
      prods: products,
      pageTitle: 'Manage Your Prodicu',
      path: '/admin/manage-product',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};




exports.productDetails = (req,res,next) => {
    res.render('endusers/product-details' , {
      path:'/product-details',
      pageTitle: 'Product Details'
    })
}

exports.index = (req,res,next) => {
  res.render('endusers/index' , {
    path:"/",
    pageTitle:'Index'
  })
}

exports.getCart = (req , res , next) =>{
  res.render('endusers/cart' , {
    path:'/cart',
    pageTitle: 'Your Basket'
  })
}

exports.addToCart = (req,res,next) =>{
  const productId = req.body.productId;
  console.log('product id' ,productId);
  Cart.addToCart(productId);
  res.redirect('/cart')
}

exports.myOrders = (req , res , next) =>{
  res.render('endusers/orders' , {
    path:'/orders',
    pageTitle:'My Orders'
  })
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('endusers/products', {
      prods: products,
      pageTitle: 'Products',
      path: '/products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};
