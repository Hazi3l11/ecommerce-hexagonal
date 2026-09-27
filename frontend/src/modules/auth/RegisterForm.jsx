import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registrar } from '../../services/usuarioService';

export default function RegisterForm() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registrar(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-xl font-semibold text-slate-800 mb-1">Crear cuenta</h1>
        <p className="text-sm text-slate-500 mb-6">Empieza a comprar en minutos</p>

        {['nombre', 'email', 'password'].map((campo) => (
          <div key={campo} className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">{campo}</label>
            <input
              name={campo}
              type={campo === 'password' ? 'password' : campo === 'email' ? 'email' : 'text'}
              onChange={handleChange} required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        ))}

        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

        <button type="submit" className="w-full bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium py-2.5 rounded-lg transition">
          Registrarme
        </button>

        <p className="text-sm text-slate-500 mt-5 text-center">
          ¿Ya tienes cuenta? <Link to="/login" className="text-brand-600 font-medium">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}
