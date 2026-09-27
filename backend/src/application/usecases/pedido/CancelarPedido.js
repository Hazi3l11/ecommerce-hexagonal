class CancelarPedido {
  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }
  async ejecutar(id) {
    return this.pedidoRepository.actualizarEstado(id, 'cancelado');
  }
}
module.exports = CancelarPedido;
