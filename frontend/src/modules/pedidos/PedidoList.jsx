import { useEffect, useState } from 'react';
import { listarPedidos, cancelarPedido } from '../../services/pedidoService';

const estadoBadge = {
  pendiente: 'bg-amber-50 text-amber-700',
  pagado: 'bg-green-50 text-green-700',
  enviado: 'bg-blue-50 text-blue-700',
  cancelado: 'bg-red-50 text-red-700',
};

const estadoTexto = {
  pendiente: 'Pendiente de Pago',
  pagado: 'Pagado',
  enviado: 'Enviado',
  cancelado: 'Cancelado',
};

export default function PedidoList() {
  const [pedidos, setPedidos] = useState([]);

  const cargar = async () => {
    const { data } = await listarPedidos();
    setPedidos(data);
  };

  useEffect(() => { cargar(); }, []);

  const handleCancelar = async (id) => {
    await cancelarPedido(id);
    cargar();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-800 mb-1">Pedidos</h1>
      <p className="text-sm text-slate-500 mb-6">Historial de compras registradas</p>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
            <tr>
              <th className="text-left px-5 py-3">ID</th>
              <th className="text-left px-5 py-3">Total</th>
              <th className="text-left px-5 py-3">Estado</th>
              <th className="text-left px-5 py-3">Fecha</th>
              <th className="text-right px-5 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pedidos.map((p) => (
              <tr key={p.id}>
                <td className="px-5 py-3 text-slate-600">{p.id.slice(0, 8)}...</td>
                <td className="px-5 py-3 font-medium text-slate-800">${p.total}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${estadoBadge[p.estado]}`}>
                    {estadoTexto[p.estado] || p.estado}
                  </span>
                </td>
                <td className="px-5 py-3 text-slate-500">{new Date(p.creado_en).toLocaleDateString()}</td>
                <td className="px-5 py-3 text-right">
                  {p.estado !== 'cancelado' && (
                    <button onClick={() => handleCancelar(p.id)} className="text-red-600 text-sm hover:underline">
                      Cancelar
                    </button>
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
