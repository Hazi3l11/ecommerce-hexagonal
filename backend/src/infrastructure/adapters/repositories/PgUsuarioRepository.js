const pool = require('../../config/db');
const UsuarioRepositoryPort = require('../../../application/ports/UsuarioRepositoryPort');
const Usuario = require('../../../domain/Usuario');

class PgUsuarioRepository extends UsuarioRepositoryPort {
  async crear(usuario) {
    const query = `
      INSERT INTO usuarios (id, nombre, email, password_hash, rol)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, nombre, email, rol, creado_en
    `;
    const values = [usuario.id, usuario.nombre, usuario.email, usuario.passwordHash, usuario.rol];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async obtenerPorId(id) {
    const { rows } = await pool.query(
      'SELECT id, nombre, email, rol, creado_en FROM usuarios WHERE id = $1', [id]
    );
    return rows[0] || null;
  }

  async obtenerPorEmail(email) {
    const { rows } = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (!rows[0]) return null;
    return new Usuario({
      id: rows[0].id,
      nombre: rows[0].nombre,
      email: rows[0].email,
      passwordHash: rows[0].password_hash,
      rol: rows[0].rol,
      creadoEn: rows[0].creado_en,
    });
  }

  async listar() {
    const { rows } = await pool.query('SELECT id, nombre, email, rol, creado_en FROM usuarios');
    return rows;
  }

  async actualizar(id, datos) {
    const { rows } = await pool.query(
      `UPDATE usuarios SET nombre = COALESCE($1, nombre), rol = COALESCE($2, rol)
       WHERE id = $3 RETURNING id, nombre, email, rol, creado_en`,
      [datos.nombre, datos.rol, id]
    );
    return rows[0];
  }

  async eliminar(id) {
    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    return true;
  }
}

module.exports = PgUsuarioRepository;
