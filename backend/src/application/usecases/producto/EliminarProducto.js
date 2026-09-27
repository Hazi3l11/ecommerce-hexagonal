class EliminarProducto {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }
  async ejecutar(id) {
    return this.productoRepository.eliminar(id);
  }
}
module.exports = EliminarProducto;
