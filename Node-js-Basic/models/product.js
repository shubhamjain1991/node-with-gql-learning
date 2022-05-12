const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
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

module.exports = class Product {
  
  constructor(t,bookUrl,description,price) {
    this.title = t;
    this.bookUrl = bookUrl
    this.description = description;
    this.price = price
  }

  save() {
    this.id = new Date().getTime();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static fetchById(cb , id){
    getProductsFromFile(products =>{
      let matched_product =  products.filter(product => product.id == id );
      cb(matched_product);
    })
  }

  static deleteById(id){
    getProductsFromFile(products =>{
      let matched_product =  products.filter(product => product.id != id );
      fs.writeFile(p, JSON.stringify(matched_product), err => {
        console.log(err);
      });
      
    })

  }

   updateProductById(){
     console.log('passed product' , this)
    getProductsFromFile(products =>{
        const productIndex =  products.findIndex(product => product.id == this.id);
        console.log('foundindex' , productIndex);
        products[productIndex] = this;
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
    })

  }
};
