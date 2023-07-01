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

  async addProduct(product) {
    try {
      const products = await this.getProducts();
      const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
      const newProduct = { id, ...product };
      products.push(newProduct);
      await fs.writeFile(this.filePath, JSON.stringify(products));
      return newProduct;
    } catch (error) {
      throw new Error('Error al agregar el producto');
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

  async updateProduct(id, updatedFields) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((p) => p.id === id);
      if (productIndex === -1) {
        throw new Error('Producto no encontrado');
      }
      products[productIndex] = { ...products[productIndex], ...updatedFields };
      await fs.writeFile(this.filePath, JSON.stringify(products));
      return products[productIndex];
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const updatedProducts = products.filter((p) => p.id !== id);
      if (updatedProducts.length === products.length) {
        throw new Error('Producto no encontrado');
      }
      await fs.writeFile(this.filePath, JSON.stringify(updatedProducts));
      return;
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }
}

module.exports = ProductManager;