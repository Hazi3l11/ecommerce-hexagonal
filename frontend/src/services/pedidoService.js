import api from './api';

export const listarPedidos = () => api.get('/pedidos');
export const obtenerPedido = (id) => api.get(`/pedidos/${id}`);
export const crearPedido = (datos) => api.post('/pedidos', datos);
export const cancelarPedido = (id) => api.put(`/pedidos/${id}/cancelar`);
