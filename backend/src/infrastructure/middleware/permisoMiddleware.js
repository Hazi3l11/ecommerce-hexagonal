const PgPermisoRepository = require('../adapters/repositories/PgPermisoRepository');
const permisoRepository = new PgPermisoRepository();

function requiereAdmin(req, res, next) {
  if (req.usuario?.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso solo para administradores' });
  }
  next();
}

function requiereAcceso(modulo) {
  return async (req, res, next) => {
    if (req.usuario?.rol === 'admin') return next();
    const tieneAcceso = await permisoRepository.tieneAcceso(req.usuario.id, modulo);
    if (!tieneAcceso) {
      return res.status(403).json({ error: `No tienes acceso al módulo de ${modulo}` });
    }
    next();
  };
}

module.exports = { requiereAdmin, requiereAcceso };
