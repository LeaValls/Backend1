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
      console.log("Se agrego satisfactoriamente el producto");
    } else {
      console.log("No se pudo agregar el producto. Por favor revisar");
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
    console.log("No encontrado");
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

const p1 = new product ()

p1.addProduct ({
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price:200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock:25

})

console.log(p1)