const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.nextId = 1; // Inicializamos el ID para autoincremento
  }

  addProduct(product) {
    // Leer productos existentes
    const products = this.getProducts();
    
    // Asignar un nuevo ID autoincremental
    product.id = this.nextId++;
    
    // Agregar el nuevo producto al arreglo
    products.push(product);
    
    // Guardar los productos actualizados en el archivo
    this.saveProducts(products);
  }

  getProducts() {
    try {
      // Leer el archivo y parsear su contenido
      const data = fs.readFileSync(this.path, 'utf-8');
      if (!data) {
        return [];
      }
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(product => product.id === id);
  }

  updateProduct(id, updatedProduct) {
    const products = this.getProducts();
    const index = products.findIndex(product => product.id === id);
    
    if (index !== -1) {
      // Actualizar el producto sin cambiar su ID
      updatedProduct.id = id;
      products[index] = updatedProduct;
      
      // Guardar los productos actualizados en el archivo
      this.saveProducts(products);
      return true;
    }
    
    return false;
  }

  deleteProduct(id) {
    let products = this.getProducts();
    const initialLength = products.length;

    products = products.filter(product => product.id !== id);

    if (products.length < initialLength) {
      // Si se eliminó un producto, guardar los productos actualizados en el archivo
      this.saveProducts(products);
      return true;
    }

    return false;
  }

  saveProducts(products) {
    // Guardar los productos en el archivo
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2), 'utf-8');
  }
}

module.exports = ProductManager;
