const { Router } = require('express');
const path = require('path');
const productManager = require('../managers/ProductManager');


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

router.get('/chat', (req, rest) => {
  rest.render('chat')
})

router.get ('/realtimeproducts', async (req, rest) => {
  const product = await productManager.getAll()

  res.tender('realTimeProducts', {
    title: 'Real Time',
    products,
    user: {
      ...req.user,
      isAdmin: req.user.role == 'admin'
    },  
    style: 'home'
  })
})

router.get('/cart', (req, res) => {
  res.render('carrito', {
    numItems: 2,
    title: 'Cart'
  });
});

module.exports = router;
