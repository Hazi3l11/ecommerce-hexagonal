import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function RutaProtegida({ children, moduloRequerido, soloAdmin }) {
  const { usuario, tieneAcceso, cargando } = useAuth();

  if (cargando) return null;
  if (!usuario) return <Navigate to="/login" replace />;
  if (soloAdmin && usuario.rol !== 'admin') return <Navigate to="/productos" replace />;
  if (moduloRequerido && !tieneAcceso(moduloRequerido)) return <Navigate to="/productos" replace />;

  return children;
}
