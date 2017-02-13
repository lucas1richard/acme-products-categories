const sqlite = require('sqlite3');
const chalk = require('chalk');

const db = new sqlite.Database('./acme.sqlite', err => {
  if (err) {
    console.log(chalk.bold.red(err));
  } else {
    console.log(chalk.bold.green('Database connection established'));
  }
});

module.exports = {
  addCategory: (category, callback) => {
    db.all(`insert into categories (name) values ('${category}')`, callback);
  },
  addProduct: (categoryId, product, callback) => {
    db.all(`insert into products (name) values ('${product}');`, () => {
      db.all(`insert into productcategories (productId, categoryId)
          select products.id, categories.id from products
          join categories on categories.id = ${categoryId}
          where products.name = "${product}";`, callback);
    });
  },
  deleteCategory: (categoryId, callback) => {
    db.all(`delete from productcategories where categoryId = ${categoryId}`, () => {
      db.all(`delete from categories where id = ${categoryId}`, callback);
    });
  },
  deleteProduct: (productId, callback) => {
    db.all(`delete from productcategories where productId = ${productId}`, () => {
      db.all(`delete from products where id = ${productId}`, callback);
    });
  },
  getCategories: callback => {
    db.all('select * from categories', callback);
  },
  getProducts: (id, callback) => {
    db.all(`select products.id, products.name, categories.name as category, categories.id as categoryId from categories
         inner join productCategories on (categories.id = productCategories.categoryId)
         inner join products on (products.id = productCategories.productId)
         where categories.id=${id}`, callback);
  },
};
