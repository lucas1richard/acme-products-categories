const express = require('express');
const sql = require('../db.js');
const chalk = require('chalk');
const bodyParser = require('body-parser');

const router = new express.Router();

router.use(bodyParser.urlencoded({ extended: false }));


router.get('/categories', (req, res) => {
  sql.getCategories((err, categories) => {
    if (err) console.log(err);
    res.render('categories', { categories });
  });
});

router.get('/categories/:id', (req, res) => {
  const id = req.params.id;
  sql.getProducts(id, (err, products) => {
    if (err) {
      console.log(chalk.bold.red(err));
    } else if (products[0]) {
      const categoryname = products[0].category;
      const category = { id: products[0].categoryId };
      res.render('category', { products, categoryname, category });
    } else {
      res.sendStatus(404);
    }
  });
});

router.post('/categories', (req, res) => {
  const category = req.body.category;
  sql.addCategory(category, err => {
    if (err) console.log(chalk.bold.red(err));
    res.redirect('/categories');
  });
});

router.post('/categories/:id/products', (req, res) => {
  const categoryId = req.params.id;
  const product = req.body.product;
  sql.addProduct(categoryId, product, err => {
    if (err) console.log(chalk.bold.red(err));
    res.redirect(`/categories/${categoryId}`);
  });
});

router.delete('/categories/:categoryId/products/:productId', (req, res) => {
  const categoryId = req.params.categoryId;
  const productId = req.params.productId;
  sql.deleteProduct(productId, err => {
    if (err) console.log(chalk.bold.red(err));
    res.redirect(`/categories/${categoryId}`);
  });
});

router.delete('/categories/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  sql.deleteCategory(categoryId, err => {
    if (err) console.log(chalk.bold.red(err));
    res.redirect(`/categories`);
  });
});

module.exports = router;
