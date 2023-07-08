const express = require('express');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const app = express();
const port = 8080;

// Middleware para procesar JSON en el cuerpo de las peticiones
app.use(express.json());

// Rutas para el manejo de productos
app.use('/api/products', productsRouter);

// Rutas para el manejo de carritos
app.use('/api/carts', cartsRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});