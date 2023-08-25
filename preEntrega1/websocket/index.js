const productManager = require('../managers/ProductManager')
const cartManager = require('../managers/CartManager')
//const productManager = new ProductManager('products.json')
//const cartManager = new CartManager('cart.json')
const chatMessageManager = require ('../managers/Chat.message.manager')

async function socketManager(socket) {
  console.log(`user has connected: ${socket.id}`)

  const messages = await chatMessageManager.getAll()
  console.log(messages)
  socket.emit('chat-messages', messages)
  
  socket.on('chat-message', async (msg) => {
    
    console.log(msg)
    await chatMessageManager.create(msg)
    socket.broadcast.emit('chat-message', msg)
  })

//  socket.on('disconnect', () => {
//    console.log('user disconnected')
//  })


//   socket.on('addToCart', async ({ userId, productId }) => {
//    await cartManager.addProduct(userId, productId)
//    const products = await cartManager.getProductsByUserId(userId)

//    socket.emit('productsInCart', products)
//})
}

module.exports = socketManager
