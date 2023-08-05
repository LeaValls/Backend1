(async () => {
const express = require('express')
const http = require('http')
const path = require('path')
const handlebars = require('express-handlebars')
const { Server } = require("socket.io");
const mongoose = require('mongoose')

const Routes = require('./routers/index')
const socketManager = require('./websocket')

try {
  
  // ${SCHEMA}://{USER}:{PASSWORD}@{HOSTNAME}:${PORT}/${DATABASE} -> LOCAL mongodb://localhost:27017/ecommerce
  // mongoose.connect("mongodb://localhost:27017/ecommerce")

  await mongoose.connect("mongodb+srv://app:vXqYhVf2Qj1FXYXL@cluster0.ryzcf1s.mongodb.net/?retryWrites=true&w=majorityy")

  const app = express() 
  const server = http.createServer(app) 
  const io = new Server(server) 

  app.engine('handlebars', handlebars.engine()) 
  app.set('views', path.join(__dirname, '/views')) 
  app.set('view engine', 'handlebars')

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use('/static', express.static(path.join(__dirname + '/public')))

 
  app.use((req, res, next) => {
    
  
    req.user = {
      name: "Jonh",
      role: "admin"
    }

    next()
  })
  

  app.use('/', Routes.home)
  app.use('/api', (req, res, next) => {
    req.io = io
    next()
  }, Routes.api)


  io.on('connection', socketManager)


const port = 8080

server.listen(port, () => {
  console.log(`Express Server listening at http://localhost:${port}`)
})
console.log('se ha conectado a la base de datos')
} catch(e) {
  console.log('no se ha podido conectar a la base de datos')
  console.log(e)
}
})()