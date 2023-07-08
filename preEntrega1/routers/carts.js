const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

router.get('/', cartsController.getCarts);
router.post('/', cartsController.addCart);
router.get('/:cid', cartsController.getCartById);
router.post('/:cid/products/:pid', cartsController.addProductToCart);

module.exports = router;