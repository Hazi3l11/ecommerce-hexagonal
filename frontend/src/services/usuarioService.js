import api from './api';

export const registrar = (datos) => api.post('/usuarios/registro', datos);
export const login = (datos) => api.post('/usuarios/login', datos);
export const listarUsuarios = () => api.get('/usuarios');
