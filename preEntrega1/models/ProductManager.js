const fs = require('fs/promises');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getProducts() {
    try {
      const fileData = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(fileData);
    } catch (error) {
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const product = products.find((p) => p.id === id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const id = this.getNextId(products);
    const newProduct = { id, ...product };
    products.push(newProduct);
    await this.saveProducts(products);
    return newProduct;
  }

  async updateProduct(id, updatedFields) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }
    const updatedProduct = { ...products[index], ...updatedFields };
    products[index] = updatedProduct;
    await this.saveProducts(products);
    return updatedProduct;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }
    products.splice(index, 1);
    await this.saveProducts(products);
  }

  getNextId(products) {
    const maxId = products.reduce((max, product) => Math.max(max, product.id), 0);
    return maxId + 1;
  }

  async saveProducts(products) {
    await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
  }
}

module.exports = ProductManager;