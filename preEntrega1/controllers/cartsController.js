const fs = require('fs/promises');

const getCarts = async (req, res) => {
  try {
    const fileData = await fs.readFile('data/cart.json', 'utf-8');
    const carts = JSON.parse(fileData);
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los carritos' });
  }
};

const addCart = async (req, res) => {
  try {
    const fileData = await fs.readFile('data/cart.json', 'utf-8');
    const carts = JSON.parse(fileData);
    const id = getNextId(carts);
    const newCart = { id, products: [] };
    carts.push(newCart);
    await fs.writeFile('data/cart.json', JSON.stringify(carts, null, 2));
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el carrito' });
  }
};

const getCartById = async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const fileData = await fs.readFile('data/cart.json', 'utf-8');
    const carts = JSON.parse(fileData);
    const cart = carts.find((c) => c.id === cid);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
    res.json(cart.products);
  } catch (error) {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const quantity = req.body.quantity || 1;

    const fileData = await fs.readFile('data/cart.json', 'utf-8');
    const carts = JSON.parse(fileData);

    const cartIndex = carts.findIndex((c) => c.id === cid);
    if (cartIndex === -1) {
      throw new Error('Carrito no encontrado');
    }

    const cart = carts[cartIndex];
    const existingProductIndex = cart.products.findIndex((p) => p.id === pid);
    if (existingProductIndex === -1) {
      cart.products.push({ id: pid, quantity });
    } else {
      cart.products[existingProductIndex].quantity += quantity;
    }

    await fs.writeFile('data/cart.json', JSON.stringify(carts, null, 2));
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
};

const getNextId = (carts) => {
  const maxId = carts.reduce((max, cart) => Math.max(max, cart.id), 0);
  return maxId + 1;
};

module.exports = {
  getCarts,
  addCart,
  getCartById,
  addProductToCart,
};