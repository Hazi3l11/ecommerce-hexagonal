const { v4: uuidv4 } = require('uuid');
const Producto = require('../../../domain/Producto');

class CrearProducto {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }
  async ejecutar({ nombre, descripcion, precio, stock }) {
    const producto = new Producto({ id: uuidv4(), nombre, descripcion, precio, stock });
    return this.productoRepository.crear(producto);
  }
}
module.exports = CrearProducto;
