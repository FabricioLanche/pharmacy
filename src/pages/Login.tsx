import { useState } from 'react';
import { useAuth } from '../hooks/useAuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(correo, contrasena);
    if (!ok) {
      setError('Credenciales incorrectas');
    } else {
      const from = (location.state as any)?.from || '/';
      navigate(from, { replace: true });
    }
  };

  return (
    <main>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo:</label>
          <input value={correo} onChange={e => setCorreo(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={contrasena} onChange={e => setContrasena(e.target.value)} required />
        </div>
        <button type="submit">Entrar</button>
        {error && <p style={{color:'red'}}>{error}</p>}
      </form>
      <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </main>
  );
}