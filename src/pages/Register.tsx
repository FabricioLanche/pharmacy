
import { useState } from 'react';
import { useAuth } from '../hooks/useAuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const [correo, setCorreo] = useState('');
  const [DNI, setDNI] = useState('');
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = register({ correo, DNI, nombre, contrasena });
    if (!ok) setError('Correo ya registrado');
    else {
      navigate(-1);
    }
  };

  return (
    <main>
      <h2>Registro de usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo:</label>
          <input value={correo} onChange={e => setCorreo(e.target.value)} required />
        </div>
        <div>
          <label>DNI:</label>
          <input value={DNI} onChange={e => setDNI(e.target.value)} required />
        </div>
        <div>
          <label>Nombre:</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={contrasena} onChange={e => setContrasena(e.target.value)} required />
        </div>
        <button type="submit">Registrarse</button>
        {error && <p style={{color:'red'}}>{error}</p>}
      </form>
      <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
    </main>
  );
}
