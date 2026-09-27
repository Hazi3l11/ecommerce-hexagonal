class Pedido {
  constructor({ id, usuarioId, estado = 'pendiente', items = [], creadoEn }) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.estado = estado;
    this.items = items;
    this.creadoEn = creadoEn;
  }

  calcularTotal() {
    return this.items.reduce(
      (total, item) => total + item.cantidad * item.precioUnitario,
      0
    );
  }
}

module.exports = Pedido;
