class ListarPedidos {
  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }
  async ejecutar() {
    return this.pedidoRepository.listar();
  }
}
module.exports = ListarPedidos;
