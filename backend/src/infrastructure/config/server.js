const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usuarioController = require('../adapters/http/usuarioController');
const productoController = require('../adapters/http/productoController');
const pedidoController = require('../adapters/http/pedidoController');
const adminController = require('../adapters/http/adminController');
const permisoController = require('../adapters/http/permisoController');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioController);
app.use('/api/productos', productoController);
app.use('/api/pedidos', pedidoController);
app.use('/api/admin', adminController);
app.use('/api/permisos', permisoController);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
