import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem('usuario') || 'null')
  );
  const [permisos, setPermisos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarPermisos = async () => {
    try {
      const { data } = await api.get('/permisos/mios');
      setPermisos(data.permisos);
    } catch {
      setPermisos([]);
    }
  };

  useEffect(() => {
    if (usuario) cargarPermisos().finally(() => setCargando(false));
    else setCargando(false);
  }, [usuario]);

  const iniciarSesion = (datosUsuario, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
    setUsuario(datosUsuario);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
    setPermisos([]);
  };

  const tieneAcceso = (modulo) => usuario?.rol === 'admin' || permisos.includes(modulo);

  return (
    <AuthContext.Provider value={{ usuario, permisos, cargando, iniciarSesion, cerrarSesion, tieneAcceso, recargarPermisos: cargarPermisos }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
