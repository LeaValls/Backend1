const mongoose = require('mongoose')

async function main() {
  await mongoose.connect("mongodb+srv://app:5UJvYAsuYJ9v461V@cluster0.ryzcf1s.mongodb.net/ecommerce?retryWrites=true&w=majority")

  const cartModel = require('../models/cart.model')
  const usersModel = require('../models/user.model')
  const productsModel = require('../models/product.model')
  const purchaseOrderModel = require('../models/po.model')
  const addressModel = require('../models/address.model')

  

  const cart = await cartModel.findOne({ user: '624af07138abc8971d0b938c' })
    .populate({ path: 'products.product', select: ['price', 'title']})

  console.log(JSON.stringify(cart, null, 2))
  
  const addr = await addressModel.create({
    line1: '5541 SW Kendall Dr',
    line2: 'Suite 1302',
    city: 'Memphis',
    country: 'US',
    zipCode: 12354
  })

  const po = await purchaseOrderModel.create({
    user: cart.user._id,
    total: cart.products.reduce((total, p) => total += p.product.price * p.qty, 0),
    postAddress: addr._id,
    products: cart.products.map(({ qty, product: { _id } }) => ({
      product: _id,
      qty: qty
    })),
    estimatedDelivery: 1691533805
  })


  
  const _po = await purchaseOrderModel.findOne({ _id: po._id })
    .populate({ path: 'user', select: ['firstname', 'email' ] })
    .populate('postAddress')
    .populate({ path: 'products.product', select: ['title']})

  console.log(JSON.stringify(_po, null, 2))

  cart.products = []

  await cart.save()


  

  await mongoose.disconnect()
}

main()