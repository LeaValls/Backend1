const ProductManager = require('../models/ProductManager');

const productManager = new ProductManager('./preEntrega1/data/products.json');

const getProducts = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await productManager.getProducts();
    const limitedProducts = limit ? products.slice(0, limit) : products;
    res.json({ products: limitedProducts });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

const getProductById = async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const product = await productManager.getProductById(pid);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
};

const addProduct = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productManager.addProduct(product);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const updatedFields = req.body;
    const updatedProduct = await productManager.updateProduct(pid, updatedFields);
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
};

const deleteProduct = async (req,res) => {
  try {
    const pid = parseInt(req.params.pid);
    await productManager.deleteProduct(pid);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};