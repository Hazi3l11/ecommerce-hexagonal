const { v4: uuidv4 } = require('uuid');
const Pedido = require('../../../domain/Pedido');

class CrearPedido {
  constructor(pedidoRepository, productoRepository) {
    this.pedidoRepository = pedidoRepository;
    this.productoRepository = productoRepository;
  }

  async ejecutar({ usuarioId, items }) {
    const itemsConPrecio = [];

    for (const item of items) {
      const producto = await this.productoRepository.obtenerPorId(item.productoId);
      if (!producto) throw new Error(`Producto ${item.productoId} no existe`);
      if (!producto.tieneStockSuficiente(item.cantidad)) {
        throw new Error(`Stock insuficiente para "${producto.nombre}"`);
      }

      producto.descontarStock(item.cantidad);
      await this.productoRepository.actualizar(producto.id, { stock: producto.stock });

      itemsConPrecio.push({
        productoId: producto.id,
        cantidad: item.cantidad,
        precioUnitario: producto.precio,
      });
    }

    const pedido = new Pedido({
      id: uuidv4(),
      usuarioId,
      estado: 'pendiente',
      items: itemsConPrecio,
    });

    const total = pedido.calcularTotal();
    return this.pedidoRepository.crear(pedido, total);
  }
}

module.exports = CrearPedido;
