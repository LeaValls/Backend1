const express = require('express');
const router = express.Router();
const cartManager = require('../../managers/CartManager');

router.get('/', cartManager.getCarts);
router.post('/', cartManager.addCart);
router.get('/:cid', cartManager.getCartById);
router.post('/:cid/products/:pid', cartManager.addProductToCart);

module.exports = router;

