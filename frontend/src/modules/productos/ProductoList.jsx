import { useEffect, useState } from 'react';
import { listarProductos, eliminarProducto } from '../../services/productoService';
import { useAuth } from '../../context/AuthContext';
import ProductoForm from './ProductoForm';

export default function ProductoList() {
  const [productos, setProductos] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const { usuario } = useAuth();

  const cargar = async () => {
    const { data } = await listarProductos();
    setProductos(data);
  };

  useEffect(() => { cargar(); }, []);

  const handleEliminar = async (id) => {
    await eliminarProducto(id);
    cargar();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Catálogo</h1>
          <p className="text-sm text-slate-500">Gestión de productos disponibles</p>
        </div>
        {usuario?.rol === 'admin' && (
          <button
            onClick={() => setMostrarForm((v) => !v)}
            className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            + Nuevo producto
          </button>
        )}
      </div>

      {mostrarForm && (
        <div className="mb-6">
          <ProductoForm onCreado={() => { cargar(); setMostrarForm(false); }} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {productos.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-slate-800">{p.nombre}</h3>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${p.stock > 5 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                {p.stock} disp.
              </span>
            </div>
            <p className="text-sm text-slate-500 mb-3 line-clamp-2">{p.descripcion}</p>
            <p className="text-lg font-semibold text-brand-600 mb-4">${p.precio}</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium py-2 rounded-lg transition">
                Agregar
              </button>
              {usuario?.rol === 'admin' && (
                <button
                  onClick={() => handleEliminar(p.id)}
                  className="px-3 border border-red-200 text-red-600 text-sm rounded-lg hover:bg-red-50 transition"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
