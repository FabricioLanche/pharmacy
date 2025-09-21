import { useAuth } from '../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';

export default function UserDetails() {
  const { user, token } = useAuth();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main style={{ maxWidth: 500, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
      <h2>Detalles de la cuenta</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><strong>Nombre:</strong> {user.nombre}</li>
        <li><strong>Correo:</strong> {user.correo}</li>
        <li><strong>DNI:</strong> {user.DNI}</li>
        <li><strong>ID:</strong> {user.id}</li>
      </ul>
    </main>
  );
}
