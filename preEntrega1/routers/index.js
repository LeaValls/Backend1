const { Router } = require('express')
const ProductRoutes = require('./api/products.router')
const HomeRoutes = require('./home.router')
const UserRoutes = require('./api/user')
const LoginRoutes = require('./login.router')
const AdminRoutes = require('./admin.router')
const { custom: CartRoutes } = require('./api/carts')

const { jwtVerifyAuthToken } = require("../middlewares/jwt.auth.middleware.js");
const { jwtRoutes } = require("./api/auth.router.js");



const api = Router();

api.use('/products', jwtVerifyAuthToken, ProductRoutes);
api.use('/user', jwtVerifyAuthToken, UserRoutes);
api.use('/carts', CartRoutes.getRouter())
api.use("/jwtAuth", jwtRoutes);



const home = Router()

home.use('/', HomeRoutes)
home.use('/', LoginRoutes)
home.use('/admin', AdminRoutes)


module.exports = {
  api,
  home
};