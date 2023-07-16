const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const expressHandlebars = require('express-handelbars');
const productsRouter = require('./routers/products');


app.engine('handlebars', expressHandlebars());
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

const PORT = 8080;
http.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});