class PedidoRepositoryPort {
  async crear(pedido, total) { throw new Error('No implementado'); }
  async obtenerPorId(id) { throw new Error('No implementado'); }
  async listar() { throw new Error('No implementado'); }
  async actualizarEstado(id, estado) { throw new Error('No implementado'); }
}
module.exports = PedidoRepositoryPort;
