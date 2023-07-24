const { Router } = require('express');
const path = require('path');
const ProductManager = require('../models/ProductManager');
const productManager = new ProductManager('products.json');

const router = Router();



router.get('/', async (req, res) => {

  const products = await productManager.getAll()
  

  res.render('home', {
    title: 'Home',
    products,
    user: {
      ...req.user,
      isAdmin: req.user.role == 'admin',
    },
    style: 'home'
  });
});

router.get('/carts', (req, res) => {
  res.render('carts', {
    numItems: 2,
    title: 'Carrito'
  });
});

module.exports = router;
