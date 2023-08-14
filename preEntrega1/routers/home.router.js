const { Router } = require('express');
const path = require('path');
const productManager = require('../managers/ProductManager');


const router = Router();


router.get('/', async (req, res) => {

  const { page=1, size=5 } = req.query
  const { docs: products, ...pageInfo } = await productManager.getAllPaged(page, size)

  pageInfo.prevLink = pageInfo.hasPrevPage ? `http://localhost:8080/?page=${pageInfo.prevPage}&size=${size}` : ''
  pageInfo.nextLink = pageInfo.hasNextPage ? `http://localhost:8080/?page=${pageInfo.nextPage}&size=${size}` : ''

  console.log("ID del product manager desde home router", productManager.id)

  console.log(pageInfo)
  

  res.render('home', {
    title: 'Home',
    products,
    pageInfo,
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

router.get ('/realtimeproducts', async (req, res) => {
  const product = await productManager.getAll()

  res.render('realTimeProducts', {
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
