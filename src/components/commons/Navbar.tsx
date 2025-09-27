import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuthContext';
import { TipoProductoBackend } from '../../types/ProductoBackend';
import { productosService } from '../../services/productosService';
import { useState, useRef, useCallback, useEffect } from 'react';
import CartSidebar from './CartSidebar';
import { useCart } from '../../hooks/useCartContext';
import type { Producto } from '../../types/ProductoBackend';

interface SearchResult {
  productos: Producto[];
  total: number;
  page: number;
  pagesize: number;
  totalPages: number;
  isSearch: boolean;
  searchQuery?: string;
  tipoFilter?: string;
}

interface NavbarProps {
  onSearchResults?: (results: SearchResult | undefined) => void;
  onPageChangeRequest?: (callback: (page: number) => Promise<void>) => void;
}

export default function Navbar({ onSearchResults, onPageChangeRequest }: NavbarProps) {
  const { token, logout, user } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTipo, setSelectedTipo] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const debounceRef = useRef<number | null>(null);
  
  // Estado para mantener la búsqueda activa
  const [activeSearch, setActiveSearch] = useState<{
    tipo: string | null;
    search: string;
  } | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isProductDetails = location.pathname.startsWith('/product/');

  // Obtener todos los tipos del backend
  const tiposArray = Object.values(TipoProductoBackend);

  // Función para cambio de página en búsquedas activas
  const handleSearchPageChange = useCallback(async (page: number) => {
    if (!activeSearch) {
      console.log('No hay búsqueda activa para paginar');
      return;
    }
    
    console.log(`🔍 Cambiando a página ${page} de búsqueda:`, activeSearch);
    await performSearch(activeSearch.tipo, activeSearch.search, page);
  }, [activeSearch]);

  // Registrar la función de cambio de página con el componente padre
  useEffect(() => {
    if (onPageChangeRequest) {
      onPageChangeRequest(handleSearchPageChange);
    }
  }, [handleSearchPageChange, onPageChangeRequest]);

  // Función de filtrado usando endpoints del backend
  const performSearch = useCallback(async (tipo: string | null, search: string, page: number = 1) => {
    if (!onSearchResults) return;
    
    try {
      let response;
      let searchResult: SearchResult;
      
      if (search.trim() && tipo) {
        // Buscar por nombre y luego filtrar por tipo (combinado)
        response = await productosService.listarPorNombre({
          nombre: search.trim(),
          page,
          pagesize: 25
        });
        const filteredProducts = response.productos.filter(p => p.tipo === tipo);
        searchResult = {
          productos: filteredProducts,
          total: filteredProducts.length, // Aproximado para filtrado local
          page,
          pagesize: 25,
          totalPages: Math.ceil(filteredProducts.length / 25),
          isSearch: true,
          searchQuery: search.trim(),
          tipoFilter: tipo
        };
      } else if (search.trim()) {
        // Solo búsqueda por nombre
        response = await productosService.listarPorNombre({
          nombre: search.trim(),
          page,
          pagesize: 25
        });
        searchResult = {
          productos: response.productos,
          total: response.total,
          page: response.page,
          pagesize: response.pagesize,
          totalPages: Math.ceil(response.total / response.pagesize),
          isSearch: true,
          searchQuery: search.trim()
        };
      } else if (tipo) {
        // Solo filtro por tipo
        response = await productosService.listarPorTipo({
          tipo,
          page,
          pagesize: 25
        });
        searchResult = {
          productos: response.productos,
          total: response.total,
          page: response.page,
          pagesize: response.pagesize,
          totalPages: Math.ceil(response.total / response.pagesize),
          isSearch: true,
          tipoFilter: tipo
        };
      } else {
        // Sin filtros, limpiar resultados para volver al estado normal
        setActiveSearch(null);
        onSearchResults(undefined);
        return;
      }
      
      // Guardar parámetros de búsqueda activa para paginación
      setActiveSearch({ tipo, search });
      onSearchResults(searchResult);
    } catch (error) {
      console.error('Error filtrando productos:', error);
      onSearchResults({
        productos: [],
        total: 0,
        page: 1,
        pagesize: 25,
        totalPages: 0,
        isSearch: true
      });
    }
  }, [onSearchResults]);

  // Handler para el dropdown (sin debounce, es inmediato)
  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'all' ? null : e.target.value;
    setSelectedTipo(value);
    
    // Limpiar debounce anterior si existe
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    // Ejecutar búsqueda inmediatamente para cambio de tipo
    performSearch(value, searchText);
  };

  // Handler para el searchbar (con debounce)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearchText(search);
    
    // Limpiar el timeout anterior
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Crear nuevo timeout para debounce
    debounceRef.current = setTimeout(() => {
      performSearch(selectedTipo, search);
    }, 500);
  };

  return (
    <>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}>Pharmacy App</Link>
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
              <select 
                value={selectedTipo ?? 'all'} 
                onChange={handleTipoChange} 
                style={{ padding: '0.3rem 0.6rem', borderRadius: 4 }}
              >
                <option value="all">Todos los tipos</option>
                {tiposArray.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchText}
                onChange={handleSearchChange}
                style={{ 
                  padding: '0.5rem', 
                  minWidth: 200,
                  borderRadius: 4,
                  border: '1px solid #ccc'
                }}
              />
            </>
          )}
          {token ? (
            <>
              <Link to="/user-details" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>
                Hola, {user?.nombre}
              </Link>
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