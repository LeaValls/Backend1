const fs = require('fs/promises')
const path = require('path')
const mongoose = require('mongoose')

const productModel = require('../models/product.model')

async function seed() {
  await mongoose.connect("mongodb+srv://app:VU61xL88zxcvzJJB@cluster0.ryzcf1s.mongodb.net/?retryWrites=true&w=majorityy")

  const filepath = path.join(__dirname, '../', 'data/productos.json')
  const data = await fs.readFile(filepath, 'utf-8')
  const products = JSON.parse(data).map(({ id, ...product }) => product)

  const result = await productModel.insertMany(products)

  console.log(result)

  await mongoose.disconnect()
}

seed()