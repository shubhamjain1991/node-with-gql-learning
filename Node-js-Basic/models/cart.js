const fs = require('fs');
const path = require('path');
const ProductDto = require('./product')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};


module.exports = class Cart {
  static addToCart(productId) {
    ProductDto.fetchAll(products => {
      let productDetails = products.find(product => product.id == productId);
      getProductsFromFile(cartProducts => {
        let availableProductInCartIndex = cartProducts.findIndex(cartProduct => cartProduct.product.id == productId)
        if (availableProductInCartIndex > -1) {
          let availProd = cartProducts[availableProductInCartIndex]
          availProd.qty += 1;
          availProd.price += +productDetails.price;
          cartProducts[availableProductInCartIndex] = availProd;
        } else {
          cartProducts.push({ product: productDetails, qty: 1, price: +productDetails.price })
        }
        fs.writeFile(p, JSON.stringify(cartProducts), err => {
          console.log(err);
        });
      })
    });
  }

  static getCart(cb){
    getProductsFromFile(cb)
  }

  static removeItemFromCart(id){
    getProductsFromFile(cart => {
      console.log("available cart" , cart  , "passed id" , id)
      const updatedCart = cart.filter(cartItem=> cartItem.product.id != id);
      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });

    })

  }

}