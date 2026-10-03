import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearPedido } from '../../services/pedidoService';
import { useAuth } from '../../context/AuthContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [carrito, setCarrito] = useState([]);
  const [error, setError] = useState('');
  const [procesando, setProcesando] = useState(false);

  useEffect(() => {
    const guardado = JSON.parse(
      localStorage.getItem('carrito') || '[]'
    );

    setCarrito(guardado);
  }, []);

  const cambiarCantidad = (productoId, cantidad) => {
    const nuevo = carrito
      .map((item) =>
        item.id === productoId
          ? { ...item, cantidad }
          : item
      )
      .filter((item) => item.cantidad > 0);

    setCarrito(nuevo);
    localStorage.setItem('carrito', JSON.stringify(nuevo));
  };

  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  const confirmarPedido = async () => {
    if (!carrito.length) return;

    setError('');
    setProcesando(true);

    try {
      await crearPedido({
        items: carrito.map((item) => ({
          productoId: item.id,
          cantidad: item.cantidad,
        })),
      });

      localStorage.removeItem('carrito');

      alert(
        'Pedido creado correctamente. Revisa tu correo para consultar las instrucciones de pago.'
      );

      navigate('/pedidos');
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'No fue posible crear el pedido'
      );
    } finally {
      setProcesando(false);
    }
  };

  if (!usuario) {
    return <p>Debes iniciar sesión.</p>;
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">
          Confirmar compra
        </h1>

        <p className="text-sm text-slate-500">
          Revisa tu pedido antes de confirmarlo.
        </p>
      </div>

      {!carrito.length ? (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <p className="text-slate-500">
            Tu carrito está vacío.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            {carrito.map((item) => (
              <div
                key={item.id}
                className="p-5 border-b border-slate-100 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium text-slate-800">
                    {item.nombre}
                  </h3>

                  <p className="text-sm text-slate-500">
                    ${Number(item.precio).toFixed(2)} c/u
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max={item.stock}
                    value={item.cantidad}
                    onChange={(e) =>
                      cambiarCantidad(
                        item.id,
                        Number(e.target.value)
                      )
                    }
                    className="w-20 px-2 py-1 border border-slate-300 rounded-lg"
                  />

                  <span className="font-medium">
                    $
                    {(
                      item.precio * item.cantidad
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="mt-4 bg-amber-50 text-amber-800 rounded-lg p-4 text-sm">
              <strong>Importante:</strong> el pedido quedará
              en estado <strong>Pendiente de Pago</strong>.
              Recibirás las instrucciones bancarias por correo.
            </div>

            {error && (
              <p className="text-red-600 text-sm mt-4">
                {error}
              </p>
            )}

            <button
              onClick={confirmarPedido}
              disabled={procesando}
              className="w-full mt-5 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-medium py-3 rounded-lg"
            >
              {procesando
                ? 'Creando pedido...'
                : 'Confirmar pedido'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}