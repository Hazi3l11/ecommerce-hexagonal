const express = require('express');
const router = express.Router();

const PgPedidoRepository = require('../repositories/PgPedidoRepository');
const PgProductoRepository = require('../repositories/PgProductoRepository');
const CrearPedido = require('../../../application/usecases/pedido/CrearPedido');
const ListarPedidos = require('../../../application/usecases/pedido/ListarPedidos');
const ObtenerPedido = require('../../../application/usecases/pedido/ObtenerPedido');
const CancelarPedido = require('../../../application/usecases/pedido/CancelarPedido');
const verificarToken = require('../../middleware/authMiddleware');
const { requiereAcceso } = require('../../middleware/permisoMiddleware');

const pedidoRepository = new PgPedidoRepository();
const productoRepository = new PgProductoRepository();

router.use(verificarToken, requiereAcceso('pedidos'));

router.post('/', async (req, res) => {
  try {
    const usecase = new CrearPedido(pedidoRepository, productoRepository);
    const pedido = await usecase.ejecutar(req.body);
    res.status(201).json(pedido);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const usecase = new ListarPedidos(pedidoRepository);
  res.json(await usecase.ejecutar());
});

router.get('/:id', async (req, res) => {
  const usecase = new ObtenerPedido(pedidoRepository);
  const pedido = await usecase.ejecutar(req.params.id);
  pedido ? res.json(pedido) : res.status(404).json({ error: 'No encontrado' });
});

router.put('/:id/cancelar', async (req, res) => {
  const usecase = new CancelarPedido(pedidoRepository);
  res.json(await usecase.ejecutar(req.params.id));
});

module.exports = router;
