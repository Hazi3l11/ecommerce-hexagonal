import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RutaProtegida } from './context/RutaProtegida';
import DashboardLayout from './layouts/DashboardLayout';
import LoginForm from './modules/auth/LoginForm';
import RegisterForm from './modules/auth/RegisterForm';
import ProductoList from './modules/productos/ProductoList';
import PedidoList from './modules/pedidos/PedidoList';
import UsuariosAdmin from './modules/usuarios/UsuariosAdmin';
import Checkout from './modules/pedidos/Checkout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registro" element={<RegisterForm />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route element={<DashboardLayout />}>
            <Route path="/productos" element={
              <RutaProtegida moduloRequerido="productos"><ProductoList /></RutaProtegida>
            } />
            <Route path="/pedidos" element={
              <RutaProtegida moduloRequerido="pedidos"><PedidoList /></RutaProtegida>
            } />
            <Route path="/usuarios" element={
              <RutaProtegida soloAdmin><UsuariosAdmin /></RutaProtegida>
            } />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}


export default App;
