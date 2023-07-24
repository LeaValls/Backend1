console.log('implementacion de websockets')
const socket = io()

const cartBadgeEl = document.querySelector('#cart-badge')



function addToCart(productId) {
  socket.emit('addToCart', { userId: 1, productId })
}

socket.on('productsInCart', (products) => {
  cartBadgeEl.innerHTML = products.length
})


socket.on('msg', (msg) => {
  console.log(msg)
})
