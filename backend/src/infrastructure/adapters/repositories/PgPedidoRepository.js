const pool = require('../../config/db');
const PedidoRepositoryPort = require('../../../application/ports/PedidoRepositoryPort');

class PgPedidoRepository extends PedidoRepositoryPort {
  async crear(pedido, total) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const { rows: pedidoRows } = await client.query(
        `INSERT INTO pedidos (id, usuario_id, estado, total)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [pedido.id, pedido.usuarioId, pedido.estado, total]
      );

      for (const item of pedido.items) {
        await client.query(
          `INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio_unitario)
           VALUES ($1, $2, $3, $4)`,
          [pedido.id, item.productoId, item.cantidad, item.precioUnitario]
        );
      }

      await client.query('COMMIT');
      return { ...pedidoRows[0], items: pedido.items };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  async obtenerPorId(id) {
    const { rows: pedidoRows } = await pool.query('SELECT * FROM pedidos WHERE id = $1', [id]);
    if (!pedidoRows[0]) return null;

    const { rows: items } = await pool.query(
      'SELECT * FROM pedido_items WHERE pedido_id = $1', [id]
    );

    return { ...pedidoRows[0], items };
  }

  async listar() {
    const { rows } = await pool.query('SELECT * FROM pedidos ORDER BY creado_en DESC');
    return rows;
  }

  async actualizarEstado(id, estado) {
    const { rows } = await pool.query(
      'UPDATE pedidos SET estado = $1 WHERE id = $2 RETURNING *',
      [estado, id]
    );
    return rows[0];
  }
}

module.exports = PgPedidoRepository;
