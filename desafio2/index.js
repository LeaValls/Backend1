const fs = require('fs');
const path = require('path')

class ProductManager {
  constructor(path) {
    this.filePath = path;
  }

  getNextId() {
    let products = this.getProductsFromFile();
    let maxId = 0;
    for (const product of products) {
      if (product.id > maxId) {
        maxId = product.id;
      }
    }
    return maxId + 1;
  }

  getProductsFromFile() {
    try {
      const fileData = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(fileData);
    } catch (error) {
      return [];
    }
  }

  saveProductsToFile(products) {
    const fileData = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.filePath, fileData);
  }

  addProduct(product) {
    const products = this.getProductsFromFile();
    const newProduct = { ...product, id: this.getNextId() };
    products.push(newProduct);
    this.saveProductsToFile(products);
  }

  getProducts() {
    return this.getProductsFromFile();
  }

  getProductById(id) {
    const products = this.getProductsFromFile();
    const product = products.find((p) => p.id === id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const products = this.getProductsFromFile();
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }
    const updatedProduct = { ...products[productIndex], ...updatedFields };
    products[productIndex] = updatedProduct;
    this.saveProductsToFile(products);
  }

  deleteProduct(id) {
    const products = this.getProductsFromFile();
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }
    products.splice(productIndex, 1);
    this.saveProductsToFile(products);
  }
}

// Ejemplo de uso
const productManager = new ProductManager(path.join(__dirname, 'products.json'));

// Agregar un producto
const newProduct = {
  title: 'Producto de ejemplo',
  description: 'Este es un producto de ejemplo',
  price: 200,
  thumbnail: 'imagen.jpg',
  code: 'ABC123',
  stock: 10,
};
productManager.addProduct(newProduct);

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log(allProducts);

// Obtener un producto por su ID
const productId = 1; // Suponiendo que el primer producto tiene ID 1
const productById = productManager.getProductById(productId);
console.log(productById);

// Actualizar un producto
const updatedFields = {
  title: 'Nuevo título',
  price: 250,
};
productManager.updateProduct(productId, updatedFields);

// Eliminar un producto
//productManager.deleteProduct(productId);

console.log(allProducts)