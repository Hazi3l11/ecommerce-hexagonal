const express = require('express');
const router = express.Router();

const PgPermisoRepository = require('../repositories/PgPermisoRepository');
const OtorgarPermiso = require('../../../application/usecases/permiso/OtorgarPermiso');
const RevocarPermiso = require('../../../application/usecases/permiso/RevocarPermiso');
const ListarPermisos = require('../../../application/usecases/permiso/ListarPermisos');
const verificarToken = require('../../middleware/authMiddleware');
const { requiereAdmin } = require('../../middleware/permisoMiddleware');

const permisoRepository = new PgPermisoRepository();

// Todas las rutas de este controlador exigen estar logueado Y ser admin
router.use(verificarToken, requiereAdmin);

router.post('/permisos', async (req, res) => {
  try {
    const usecase = new OtorgarPermiso(permisoRepository);
    const resultado = await usecase.ejecutar(req.body); // { usuarioId, modulo }
    res.status(201).json(resultado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/permisos', async (req, res) => {
  const usecase = new RevocarPermiso(permisoRepository);
  await usecase.ejecutar(req.body); // { usuarioId, modulo }
  res.status(204).send();
});

router.get('/permisos/:usuarioId', async (req, res) => {
  const usecase = new ListarPermisos(permisoRepository);
  const permisos = await usecase.ejecutar(req.params.usuarioId);
  res.json({ usuarioId: req.params.usuarioId, permisos });
});

module.exports = router;
