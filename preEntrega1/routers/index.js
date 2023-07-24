const { Router } = require('express')
const ProductRoutes = require('./api/products.router')
const HomeRoutes = require('./home.router')
const UserRoutes = require('./api/user')


const api = Router();

api.use('/products', ProductRoutes);
api.use('/user', UserRoutes);

const home = Router()

home.use('/', HomeRoutes)


module.exports = {
  api,
  home
};