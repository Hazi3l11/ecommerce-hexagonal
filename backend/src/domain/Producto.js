class Producto {
  constructor({ id, nombre, descripcion, precio, stock, creadoEn }) {
    if (precio < 0) throw new Error('El precio no puede ser negativo');
    if (stock < 0) throw new Error('El stock no puede ser negativo');
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.creadoEn = creadoEn;
  }

  tieneStockSuficiente(cantidad) {
    return this.stock >= cantidad;
  }

  descontarStock(cantidad) {
    if (!this.tieneStockSuficiente(cantidad)) {
      throw new Error(`Stock insuficiente para "${this.nombre}"`);
    }
    this.stock -= cantidad;
  }
}

module.exports = Producto;
