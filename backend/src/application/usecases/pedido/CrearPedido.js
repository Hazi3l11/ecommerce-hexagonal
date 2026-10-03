const { v4: uuidv4 } = require('uuid');
const Pedido = require('../../../domain/Pedido');

class CrearPedido {
  constructor(
    pedidoRepository,
    productoRepository,
    usuarioRepository,
    emailService
  ) {
    this.pedidoRepository = pedidoRepository;
    this.productoRepository = productoRepository;
    this.usuarioRepository = usuarioRepository;
    this.emailService = emailService;
  }

  async ejecutar({ usuarioId, items }) {
    const itemsConPrecio = [];

    for (const item of items) {
      const producto = await this.productoRepository.obtenerPorId(
        item.productoId
      );

      if (!producto) {
        throw new Error(`Producto ${item.productoId} no existe`);
      }

      if (!producto.tieneStockSuficiente(item.cantidad)) {
        throw new Error(
          `Stock insuficiente para "${producto.nombre}"`
        );
      }

      producto.descontarStock(item.cantidad);

      await this.productoRepository.actualizar(
        producto.id,
        { stock: producto.stock }
      );

      itemsConPrecio.push({
        productoId: producto.id,
        nombre: producto.nombre,
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

    const pedidoCreado = await this.pedidoRepository.crear(
      pedido,
      total
    );

    const usuario = await this.usuarioRepository.obtenerPorId(
      usuarioId
    );

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    try {
      await this.emailService.enviarComprobanteCompra({
        usuario,
        pedido: pedidoCreado,
        items: itemsConPrecio,
        total,
      });

      await this.emailService.notificarAdministrador({
        usuario,
        pedido: pedidoCreado,
        items: itemsConPrecio,
        total,
      });
    } catch (error) {
      console.error(
        'Pedido creado, pero ocurrió un error enviando los correos:',
        error.message
      );
    }

    return pedidoCreado;
  }
}

module.exports = CrearPedido;