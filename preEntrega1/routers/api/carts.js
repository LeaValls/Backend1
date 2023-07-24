const express = require('express');
const router = express.Router();
const CartManager = require('../../models/CartManager');

router.get('/', CartManager.getCarts);
router.post('/', CartManager.addCart);
router.get('/:cid', CartManager.getCartById);
router.post('/:cid/products/:pid', CartManager.addProductToCart);

module.exports = router;

