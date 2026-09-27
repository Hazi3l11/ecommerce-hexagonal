class ListarProductos {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }
  async ejecutar() {
    return this.productoRepository.listar();
  }
}
module.exports = ListarProductos;
