const pool = require('../../config/db');
const PermisoRepositoryPort = require('../../../application/ports/PermisoRepositoryPort');

class PgPermisoRepository extends PermisoRepositoryPort {
  async otorgar(usuarioId, modulo) {
    const { rows } = await pool.query(
      `INSERT INTO permisos (usuario_id, modulo)
       VALUES ($1, $2)
       ON CONFLICT (usuario_id, modulo) DO NOTHING
       RETURNING *`,
      [usuarioId, modulo]
    );
    return rows[0] || { usuario_id: usuarioId, modulo, mensaje: 'El usuario ya tenía este permiso' };
  }

  async revocar(usuarioId, modulo) {
    await pool.query('DELETE FROM permisos WHERE usuario_id = $1 AND modulo = $2', [usuarioId, modulo]);
    return true;
  }

  async listarPorUsuario(usuarioId) {
    const { rows } = await pool.query('SELECT modulo FROM permisos WHERE usuario_id = $1', [usuarioId]);
    return rows.map((r) => r.modulo);
  }

  async tieneAcceso(usuarioId, modulo) {
    const { rows } = await pool.query(
      'SELECT 1 FROM permisos WHERE usuario_id = $1 AND modulo = $2',
      [usuarioId, modulo]
    );
    return rows.length > 0;
  }
}

module.exports = PgPermisoRepository;
