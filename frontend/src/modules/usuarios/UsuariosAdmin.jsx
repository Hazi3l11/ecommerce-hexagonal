import { useEffect, useState } from 'react';
import { listarUsuarios } from '../../services/usuarioService';
import { listarPermisosDe, otorgarPermiso, revocarPermiso } from '../../services/permisoService';

export default function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [permisosPorUsuario, setPermisosPorUsuario] = useState({});

  const cargar = async () => {
    const { data } = await listarUsuarios();
    setUsuarios(data);
    const mapa = {};
    for (const u of data) {
      if (u.rol !== 'admin') {
        const { data: p } = await listarPermisosDe(u.id);
        mapa[u.id] = p.permisos;
      }
    }
    setPermisosPorUsuario(mapa);
  };

  useEffect(() => { cargar(); }, []);

  const toggleModulo = async (usuarioId, modulo, tiene) => {
    if (tiene) await revocarPermiso(usuarioId, modulo);
    else await otorgarPermiso(usuarioId, modulo);
    cargar();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-800 mb-1">Usuarios del sistema</h1>
      <p className="text-sm text-slate-500 mb-6">Gestión de accesos por rol</p>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
            <tr>
              <th className="text-left px-5 py-3">Nombre</th>
              <th className="text-left px-5 py-3">Email</th>
              <th className="text-left px-5 py-3">Rol</th>
              <th className="text-left px-5 py-3">Acceso a módulos</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td className="px-5 py-3 font-medium text-slate-800">{u.nombre}</td>
                <td className="px-5 py-3 text-slate-500">{u.email}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${u.rol === 'admin' ? 'bg-purple-50 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                    {u.rol}
                  </span>
                </td>
                <td className="px-5 py-3">
                  {u.rol === 'admin' ? (
                    <span className="text-slate-400 text-sm">Acceso total</span>
                  ) : (
                    <div className="flex gap-2">
                      {['productos', 'pedidos'].map((modulo) => {
                        const tiene = permisosPorUsuario[u.id]?.includes(modulo);
                        return (
                          <button
                            key={modulo}
                            onClick={() => toggleModulo(u.id, modulo, tiene)}
                            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition ${
                              tiene
                                ? 'bg-brand-50 border-brand-200 text-brand-700'
                                : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                            }`}
                          >
                            {modulo}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
