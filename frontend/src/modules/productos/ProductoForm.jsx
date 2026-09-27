import { useState } from 'react';
import { crearProducto } from '../../services/productoService';

export default function ProductoForm({ onCreado }) {
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '', stock: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await crearProducto({ ...form, precio: parseFloat(form.precio), stock: parseInt(form.stock, 10) });
      onCreado?.();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear producto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-5 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
      <div className="sm:col-span-1">
        <label className="block text-xs font-medium text-slate-600 mb-1">Nombre</label>
        <input name="nombre" onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
      </div>
      <div className="sm:col-span-1">
        <label className="block text-xs font-medium text-slate-600 mb-1">Descripción</label>
        <input name="descripcion" onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Precio</label>
        <input name="precio" type="number" step="0.01" onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Stock</label>
        <input name="stock" type="number" onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
      </div>
      <div className="sm:col-span-4">
        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
        <button type="submit" className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
          Guardar producto
        </button>
      </div>
    </form>
  );
}
