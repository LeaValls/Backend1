const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path')
const handlebars = require('express-handlebars');
const productsRouter = require('./routers/products');


app.engine('handlebars', handlebars.engine ());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');


app.use(express.static('public'));


app.use(express.urlencoded({ extended: true }));


app.use('/products', productsRouter);


io.on('connection', (socket) => {
  console.log('Usuario conectado');


  socket.on('addProduct', (product) => {
 
    io.emit('newProduct', product);
  });

  socket.on('deleteProduct', (productId) => {


  
    io.emit('deleteProduct', productId);
  });


  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const port = 8080;

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});