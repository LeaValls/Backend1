const ProductManager = require('../models/ProductManager')
const CartManager = require('../models/cartManager')
const productManager = new ProductManager('products.json')
const cartManager = new CartManager('cart.json')

function socketManager(socket) {
  console.log(`user has connected: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })


  socket.on('msg', (msg) => {
    socket.broadcast.emit('msg', msg)
  })

  socket.on('addToCart', async ({ userId, productId }) => {
    await cartManager.addProduct(userId, productId)
    const products = await cartManager.getProductsByUserId(userId)

    socket.emit('productsInCart', products)
  })
}

module.exports = socketManager
