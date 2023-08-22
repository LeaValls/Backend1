const express = require('express');
const router = express.Router();
const cartManager = require('../../managers/CartManager');


router.get('/', cartManager.getCarts);
router.post('/', cartManager.addCart);
router.get('/:cid', cartManager.getCartById);
router.post('/:cid/products/:pid', cartManager.addProductToCart);

router.post('/carts/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  try {
    await cartManager.addProductToCart(cid, pid);
    res.json({ message: 'Product added to cart successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete('/:cid/:pid', async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.cid);
      cart.products.pull(req.params.pid);
      await cart.save();
      res.json({ status: 'success', message: 'Product removed from cart' });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  });

  router.put('/:cid', async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.cid);
      cart.products = req.body.products;
      await cart.save();
      res.json({ status: 'success', message: 'Cart updated' });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  });

  router.put('/:cid/products/:pid', async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.cid);
      const productIndex = cart.products.findIndex(p => p._id.toString() === req.params.pid);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity = req.body.quantity;
        await cart.save();
        res.json({ status: 'success', message: 'Product quantity updated' });
      } else {
        res.status(404).json({ status: 'error', message: 'Product not found in cart' });
      }
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  });

  router.delete('/:cid', async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.cid);
      cart.products = [];
      await cart.save();
      res.json({ status: 'success', message: 'All products removed from cart' });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  });

  router.get('/products', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      const totalProducts = await Product.countDocuments();
      const totalPages = Math.ceil(totalProducts / limit);
  
      const products = await Product.find()
        .skip((page - 1) * limit)
        .limit(limit);
  
      res.render('products', { products, page, totalPages });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  });
  
  
  router.get('/carts/:cid', async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.cid).populate('products');
      res.render('cart', { cart });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  });
  
  



module.exports = router;

