import { useCart } from '../hooks/useCartContext';
import { useAuth } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

export default function CartDetail() {
  const { cart, removeItem, addItem, clearCart, checkout } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleCantidadChange = (id: string, cantidad: number) => {
    const item = cart.items.find(i => i.producto.id === id);
    if (item && cantidad > 0) {
      addItem(item.producto, cantidad - item.cantidad);
    }
  };

  const total = cart.items.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);

  return (
    <section style={{ maxWidth: 600, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
      <h2>Detalle del carrito</h2>
      {cart.items.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <table style={{ width: '100%', marginBottom: 16 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map(item => (
              <tr key={item.producto.id}>
                <td>{item.producto.nombre}</td>
                <td>
                  <input
                    type="number"
                    min={1}
                    max={item.producto.stock}
                    value={item.cantidad}
                    onChange={e => handleCantidadChange(item.producto.id, Math.max(1, Math.min(item.producto.stock, Number(e.target.value))))}
                    style={{ width: 50 }}
                  />
                </td>
                <td>S/ {item.producto.precio}</td>
                <td>S/ {(item.producto.precio * item.cantidad).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeItem(item.producto.id)} style={{ color: 'red' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>Total: S/ {total.toFixed(2)}</strong>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={clearCart} disabled={cart.items.length === 0}>Vaciar carrito</button>
          <button
            onClick={() => {
              if (!token) {
                navigate('/login');
              } else {
                checkout();
                alert('¡Compra realizada!');
                navigate('/');
              }
            }}
            disabled={cart.items.length === 0}
            style={{ background: '#2563eb', color: 'white', borderRadius: 4, padding: '0.5rem 1rem' }}
          >
            Comprar ahora
          </button>
        </div>
      </div>
    </section>
  );
}
