import api from './api';

export const listarProductos = () => api.get('/productos');
export const crearProducto = (datos) => api.post('/productos', datos);
export const actualizarProducto = (id, datos) => api.put(`/productos/${id}`, datos);
export const eliminarProducto = (id) => api.delete(`/productos/${id}`);
