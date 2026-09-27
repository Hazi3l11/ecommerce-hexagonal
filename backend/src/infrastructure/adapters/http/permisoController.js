const express = require('express');
const router = express.Router();

const PgPermisoRepository = require('../repositories/PgPermisoRepository');
const ListarPermisos = require('../../../application/usecases/permiso/ListarPermisos');
const verificarToken = require('../../middleware/authMiddleware');

const permisoRepository = new PgPermisoRepository();

router.use(verificarToken);

// Cada usuario consulta SUS PROPIOS permisos (el admin ve todo por defecto)
router.get('/mios', async (req, res) => {
  if (req.usuario.rol === 'admin') {
    return res.json({ usuarioId: req.usuario.id, rol: 'admin', permisos: ['productos', 'pedidos'] });
  }
  const usecase = new ListarPermisos(permisoRepository);
  const permisos = await usecase.ejecutar(req.usuario.id);
  res.json({ usuarioId: req.usuario.id, rol: 'usuario', permisos });
});

module.exports = router;
