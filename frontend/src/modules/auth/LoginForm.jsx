import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/usuarioService';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await login({ email, password });
      iniciarSesion(data.usuario, data.token);
      navigate('/productos');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-xl font-semibold text-slate-800 mb-1">Iniciar sesión</h1>
        <p className="text-sm text-slate-500 mb-6">Accede a tu cuenta para continuar</p>

        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
        <input
          type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
          className="w-full mb-4 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
        <input
          type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
          className="w-full mb-4 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />

        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

        <button type="submit" className="w-full bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium py-2.5 rounded-lg transition">
          Entrar
        </button>

        <p className="text-sm text-slate-500 mt-5 text-center">
          ¿No tienes cuenta? <Link to="/registro" className="text-brand-600 font-medium">Regístrate</Link>
        </p>
      </form>
    </div>
  );
}
