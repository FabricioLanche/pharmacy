import type { Producto } from '../../types/Producto';
import { Link } from 'react-router-dom';

interface ProductCardListProps {
  products?: Producto[];
}

export default function ProductCardList({ products = [] }: ProductCardListProps) {
  return (
    <section>
      <h2>Productos médicos</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((producto: Producto) => (
          <li key={producto.id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
            <h3>{producto.nombre}</h3>
            <p>Tipo: {producto.tipo}</p>
            <p>Stock: {producto.stock}</p>
            <p>Precio: S/ {producto.precio}</p>
            <Link to={`/product/${producto.id}`}>Ver detalles</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
