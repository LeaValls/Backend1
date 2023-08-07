const {Schema, model} = require('mongoose')

const schema = new Schema ({
    userId: String,
    products: {type: [String], default: []}
})

const cartModel = model ('carrito', schema)

module.exports = cartModel