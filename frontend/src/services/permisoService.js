import api from './api';

export const misPermisos = () => api.get('/permisos/mios');
export const listarPermisosDe = (usuarioId) => api.get(`/admin/permisos/${usuarioId}`);
export const otorgarPermiso = (usuarioId, modulo) => api.post('/admin/permisos', { usuarioId, modulo });
export const revocarPermiso = (usuarioId, modulo) => api.delete('/admin/permisos', { data: { usuarioId, modulo } });
