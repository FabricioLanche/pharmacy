
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuthContext';
import SearchBar from './SearchBar';
import { TipoProducto } from '../../types/Producto';
import { useState } from 'react';
import CartSidebar from './CartSidebar';
import { useCart } from '../../hooks/useCartContext';

interface NavbarProps {
  onSearchResults?: (results: any[]) => void;
}


export default function Navbar({ onSearchResults }: NavbarProps) {
  const { token, logout, user } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTipo, setSelectedTipo] = useState<TipoProducto | null>(null);
  const [searchText, setSearchText] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isProductDetails = location.pathname.startsWith('/product/');

  // Obtener todos los tipos del enum como array
  const tiposArray = Object.values(TipoProducto);

  // Filtrar productos combinando búsqueda y tipo
  const handleFilterChange = (tipo: TipoProducto | null, search: string) => {
    setSelectedTipo(tipo);
    setSearchText(search);
    import('../../assets/productsData').then(({ productsData }) => {
      let filtered = productsData;
      if (tipo) {
        filtered = filtered.filter(p => p.tipo === tipo);
      }
      if (search.trim() !== '') {
        filtered = filtered.filter(p => p.nombre.toLowerCase().includes(search.toLowerCase()));
      }
      if (onSearchResults) onSearchResults(filtered);
    });
  };

  // Handler para el dropdown
  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'all' ? null : (e.target.value as TipoProducto);
    handleFilterChange(value, searchText);
  };

  // Handler para el searchbar
  const handleSearch = (_: any[], search: string) => {
    setSearchText(search);
    handleFilterChange(selectedTipo, search);
  };

  return (
    <>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold' }}>Pharmacy App</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => setCartOpen(true)} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Ver carrito">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cart.items.length > 0 && (
              <span style={{ position: 'absolute', top: 0, right: 0, background: 'red', color: 'white', borderRadius: '50%', fontSize: 12, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cart.items.length}</span>
            )}
          </button>
          {!isProductDetails && (
            <>
              <select value={selectedTipo ?? 'all'} onChange={handleTipoChange} style={{ padding: '0.3rem 0.6rem', borderRadius: 4 }}>
                <option value="all">Todos los tipos</option>
                {tiposArray.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</option>
                ))}
              </select>
              <SearchBar onResults={handleSearch} />
            </>
          )}
          {token ? (
            <>
              <span>Hola, {user?.nombre}</span>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </>
          ) : (
            <Link to="/login" state={{ from: location.pathname }}>
              <button>Iniciar sesión</button>
            </Link>
          )}
        </div>
      </nav>
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
