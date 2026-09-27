import { useState } from 'react';
import { crearPedido } from '../../services/pedidoService';

export default function PedidoForm({ usuarioId, onCreado }) {
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await crearPedido({
        usuarioId,
        items: [{ productoId, cantidad: parseInt(cantidad, 10) }],
      });
      setProductoId('');
      setCantidad(1);
      onCreado?.();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear pedido');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nuevo pedido</h3>
      <input
        placeholder="ID de producto"
        value={productoId}
        onChange={(e) => setProductoId(e.target.value)}
        required
      />
      <input
        type="number"
        min="1"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        required
      />
      <button type="submit">Crear pedido</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
