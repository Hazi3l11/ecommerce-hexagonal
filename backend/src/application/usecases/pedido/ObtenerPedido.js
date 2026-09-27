class ObtenerPedido {
  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }
  async ejecutar(id) {
    return this.pedidoRepository.obtenerPorId(id);
  }
}
module.exports = ObtenerPedido;
