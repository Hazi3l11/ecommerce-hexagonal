const pool = require('../../config/db');
const ProductoRepositoryPort = require('../../../application/ports/ProductoRepositoryPort');
const Producto = require('../../../domain/Producto');

function fila2Producto(f) {
  return new Producto({
    id: f.id,
    nombre: f.nombre,
    descripcion: f.descripcion,
    precio: parseFloat(f.precio),
    stock: f.stock,
    creadoEn: f.creado_en,
  });
}

class PgProductoRepository extends ProductoRepositoryPort {
  async crear(producto) {
    const { rows } = await pool.query(
      `INSERT INTO productos (id, nombre, descripcion, precio, stock)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [producto.id, producto.nombre, producto.descripcion, producto.precio, producto.stock]
    );
    return rows[0];
  }

  async obtenerPorId(id) {
    const { rows } = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
    return rows[0] ? fila2Producto(rows[0]) : null;
  }

  async listar() {
    const { rows } = await pool.query('SELECT * FROM productos ORDER BY creado_en DESC');
    return rows;
  }

  async actualizar(id, datos) {
    const { rows } = await pool.query(
      `UPDATE productos SET
        nombre = COALESCE($1, nombre),
        descripcion = COALESCE($2, descripcion),
        precio = COALESCE($3, precio),
        stock = COALESCE($4, stock)
       WHERE id = $5 RETURNING *`,
      [datos.nombre, datos.descripcion, datos.precio, datos.stock, id]
    );
    return rows[0];
  }

  async eliminar(id) {
    await pool.query('DELETE FROM productos WHERE id = $1', [id]);
    return true;
  }
}

module.exports = PgProductoRepository;
