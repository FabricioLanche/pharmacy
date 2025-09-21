import { useNavigate, useParams } from 'react-router-dom';
import { productsData } from '../../assets/productsData';
import type { Producto } from '../../types/Producto';
import { useState } from 'react';
import { useCart } from '../../hooks/useCartContext';

export default function ProductDetailsView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const producto = productsData.find((p: Producto) => p.id === id);
  const { addItem } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [added, setAdded] = useState(false);

  if (!producto) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <section style={{ padding: '2rem' }}>
      <h2>{producto.nombre}</h2>
      <p><strong>Tipo:</strong> {producto.tipo}</p>
      <p><strong>Stock:</strong> {producto.stock}</p>
      <p><strong>Precio:</strong> S/ {producto.precio}</p>
      <div style={{ margin: '1rem 0' }}>
        <label>
          Cantidad:
          <input
            type="number"
            min={1}
            max={producto.stock}
            value={cantidad}
            onChange={e => setCantidad(Math.max(1, Math.min(producto.stock, Number(e.target.value))))}
            style={{ width: 60, marginLeft: 8 }}
          />
        </label>
        <button
          style={{ marginLeft: 16 }}
          onClick={() => {
            addItem(producto, cantidad);
            setAdded(true);
            setTimeout(() => setAdded(false), 1200);
          }}
        >
          Añadir al carrito
        </button>
        {added && <span style={{ color: 'green', marginLeft: 8 }}>¡Añadido!</span>}
      </div>
      <button onClick={() => navigate(-1)}>Regresar al Home</button>
    </section>
  );
}
