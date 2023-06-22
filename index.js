class Product {
  constructor(title, description, price, thumbnail, code, stock, productId) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.productId = productId;
  }

  toString() {
    return `Product ID: ${this.productId} - Title: ${this.title} - Code: ${this.code}`;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
    this.nextProductId = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (this.isCodeUnique(code) && this.areFieldsValid(title, description, price, thumbnail, code, stock)) {
      const product = new Product(title, description, price, thumbnail, code, stock, this.nextProductId);
      this.products.push(product);
      this.nextProductId++;
      console.log("Product added successfully!");
    } else {
      console.log("Failed to add product. Please check the fields.");
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(productId) {
    for (const product of this.products) {
      if (product.productId === productId) {
        return product;
      }
    }
    console.log("Not found");
  }

  isCodeUnique(code) {
    for (const product of this.products) {
      if (product.code === code) {
        return false;
      }
    }
    return true;
  }

  areFieldsValid(title, description, price, thumbnail, code, stock) {
    if (title && description && price && thumbnail && code && stock) {
      return true;
    }
    return false;
  }
}