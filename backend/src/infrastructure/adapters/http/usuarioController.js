const express = require('express');
const router = express.Router();

const PgUsuarioRepository = require('../repositories/PgUsuarioRepository');
const BcryptPasswordHasher = require('../security/BcryptPasswordHasher');
const CrearUsuario = require('../../../application/usecases/usuario/CrearUsuario');
const AutenticarUsuario = require('../../../application/usecases/usuario/AutenticarUsuario');
const ListarUsuarios = require('../../../application/usecases/usuario/ListarUsuarios');
const ActualizarUsuario = require('../../../application/usecases/usuario/ActualizarUsuario');
const EliminarUsuario = require('../../../application/usecases/usuario/EliminarUsuario');
const verificarToken = require('../../middleware/authMiddleware');
const { requiereAdmin } = require('../../middleware/permisoMiddleware');

const usuarioRepository = new PgUsuarioRepository();
const passwordHasher = new BcryptPasswordHasher();

// Públicas
router.post('/registro', async (req, res) => {
  try {
    const usecase = new CrearUsuario(usuarioRepository, passwordHasher);
    const usuario = await usecase.ejecutar(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const usecase = new AutenticarUsuario(usuarioRepository, passwordHasher);
    const resultado = await usecase.ejecutar(req.body);
    res.json(resultado);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// Solo admin de aquí en adelante
router.use(verificarToken, requiereAdmin);

router.get('/', async (req, res) => {
  const usecase = new ListarUsuarios(usuarioRepository);
  res.json(await usecase.ejecutar());
});

router.get('/:id', async (req, res) => {
  const usuario = await usuarioRepository.obtenerPorId(req.params.id);
  usuario ? res.json(usuario) : res.status(404).json({ error: 'No encontrado' });
});

router.put('/:id', async (req, res) => {
  const usecase = new ActualizarUsuario(usuarioRepository);
  res.json(await usecase.ejecutar(req.params.id, req.body));
});

router.delete('/:id', async (req, res) => {
  const usecase = new EliminarUsuario(usuarioRepository);
  await usecase.ejecutar(req.params.id);
  res.status(204).send();
});

module.exports = router;
