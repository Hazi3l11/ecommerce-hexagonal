import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const linkClass = ({ isActive }) =>
  `block px-4 py-2.5 rounded-lg text-sm font-medium transition ${
    isActive ? 'bg-brand-500 text-white' : 'text-slate-300 hover:bg-slate-700/60'
  }`;

export default function DashboardLayout() {
  const { usuario, tieneAcceso, cerrarSesion } = useAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-slate-900 flex flex-col shrink-0">
        <div className="px-5 py-5 flex items-center gap-2 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-semibold">E</div>
          <span className="text-white font-semibold">Ecommerce</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {tieneAcceso('productos') && (
            <NavLink to="/productos" className={linkClass}>Catálogo</NavLink>
          )}
          {tieneAcceso('pedidos') && (
            <NavLink to="/pedidos" className={linkClass}>Pedidos</NavLink>
          )}
          {usuario?.rol === 'admin' && (
            <NavLink to="/usuarios" className={linkClass}>Usuarios</NavLink>
          )}
        </nav>

        <div className="px-4 py-4 border-t border-slate-800">
          <p className="text-white text-sm font-medium">{usuario?.nombre}</p>
          <p className="text-slate-400 text-xs capitalize mb-3">{usuario?.rol}</p>
          <button
            onClick={cerrarSesion}
            className="w-full text-left text-sm text-slate-300 hover:text-white transition"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
