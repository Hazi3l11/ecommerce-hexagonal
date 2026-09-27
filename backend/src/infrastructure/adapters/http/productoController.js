const express = require('express');
const router = express.Router();

const PgProductoRepository = require('../repositories/PgProductoRepository');
const CrearProducto = require('../../../application/usecases/producto/CrearProducto');
const ListarProductos = require('../../../application/usecases/producto/ListarProductos');
const ActualizarProducto = require('../../../application/usecases/producto/ActualizarProducto');
const EliminarProducto = require('../../../application/usecases/producto/EliminarProducto');
const verificarToken = require('../../middleware/authMiddleware');
const { requiereAcceso } = require('../../middleware/permisoMiddleware');

const productoRepository = new PgProductoRepository();

router.use(verificarToken, requiereAcceso('productos'));

router.post('/', async (req, res) => {
  try {
    const usecase = new CrearProducto(productoRepository);
    const producto = await usecase.ejecutar(req.body);
    res.status(201).json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const usecase = new ListarProductos(productoRepository);
  res.json(await usecase.ejecutar());
});

router.get('/:id', async (req, res) => {
  const producto = await productoRepository.obtenerPorId(req.params.id);
  producto ? res.json(producto) : res.status(404).json({ error: 'No encontrado' });
});

router.put('/:id', async (req, res) => {
  try {
    const usecase = new ActualizarProducto(productoRepository);
    res.json(await usecase.ejecutar(req.params.id, req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const usecase = new EliminarProducto(productoRepository);
  await usecase.ejecutar(req.params.id);
  res.status(204).send();
});

module.exports = router;
