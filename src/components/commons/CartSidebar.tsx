import React from 'react';
import { useCart } from '../../hooks/useCartContext';
import { Link } from 'react-router-dom';

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ open, onClose }) => {
  const { cart, removeItem, clearCart } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      style={{ boxShadow: open ? '0 0 16px rgba(0,0,0,0.15)' : undefined }}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <span className="font-bold text-lg">Carrito de compras</span>
        <button onClick={onClose} className="text-2xl font-bold">&times;</button>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-2" style={{ minHeight: 200 }}>
        {cart.items.length === 0 ? (
          <div className="text-gray-500">El carrito está vacío.</div>
        ) : (
          <ul className="space-y-2">
            {cart.items.map(item => (
              <li key={item.producto.id} className="flex justify-between items-center border-b pb-1">
                <div>
                  <div className="font-semibold">{item.producto.nombre}</div>
                  <div className="text-sm text-gray-600">Cantidad: {item.cantidad}</div>
                </div>
                <button onClick={() => removeItem(item.producto.id)} className="text-red-500">Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="p-4 border-t flex flex-col gap-2">
        <Link to="/cart-detail">
          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-50" onClick={onClose} disabled={cart.items.length === 0}>
            Ver carrito en detalle
          </button>
        </Link>
        <button className="text-sm text-gray-500 underline mt-2" onClick={clearCart} disabled={cart.items.length === 0}>
          Vaciar carrito
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
