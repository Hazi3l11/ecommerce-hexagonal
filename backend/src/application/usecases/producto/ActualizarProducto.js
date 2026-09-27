class ActualizarProducto {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }
  async ejecutar(id, datos) {
    return this.productoRepository.actualizar(id, datos);
  }
}
module.exports = ActualizarProducto;
