
import { useState, useEffect } from 'react';
import ProductCardList from '../components/Home/ProductCardList';
import { recetasService } from '../services/recetasService';
import { productosService } from '../services/productosService';
import type { Producto, ProductosResponse } from '../types/ProductoBackend';
import Pagination from '../components/commons/Pagination';

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

export default function Home({ 
  searchResults, 
  onSearchPageChange 
}: { 
  searchResults?: SearchResult;
  onSearchPageChange?: ((page: number) => Promise<void>) | null;
}) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const pageSize = 25;

  // Si hay resultados de búsqueda desde el Navbar, usarlos
  useEffect(() => {
    if (searchResults === undefined) {
      // Se limpiaron los filtros, recargar productos normales
      cargarProductos(1);
    } else {
      // Hay resultados de búsqueda con información de paginación
      setProductos(searchResults.productos);
      setTotal(searchResults.total);
      setTotalPages(searchResults.totalPages);
      setCurrentPage(searchResults.page);
      setLoading(false);
    }
  }, [searchResults]);

  const cargarProductos = async (page: number = 1) => {
    try {
      setLoading(true);
      const response: ProductosResponse = await productosService.listarProductos({
        page,
        pagesize: pageSize
      });
      setProductos(response.productos);
      setTotal(response.total);
      setTotalPages(Math.ceil(response.total / pageSize));
      setCurrentPage(page);
    } catch (error) {
      console.error('❌ Error cargando productos:', error);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos(1);
  }, []);

  const handlePageChange = async (page: number) => {
    if (!searchResults) {
      // Paginación normal
      console.log(`📄 Paginación normal a página ${page}`);
      cargarProductos(page);
    } else {
      // Paginación en búsquedas
      console.log(`🔍 Solicitando página ${page} de búsqueda`);
      if (onSearchPageChange) {
        try {
          setLoading(true);
          await onSearchPageChange(page);
        } catch (error) {
          console.error('Error cambiando página de búsqueda:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('❌ Función de cambio de página de búsqueda no disponible');
      }
    }
  };
  
  const testRecetasEndpoint = async () => {
    try {
      console.log('🧪 Probando endpoint de recetas...');
      const response = await recetasService.listarRecetas({
        page: 1,
        limit: 5
      });
      console.log('✅ Respuesta del endpoint:', response);
      alert(`✅ Endpoint funcionando! Total recetas: ${response.total}`);
    } catch (error) {
      console.error('❌ Error en endpoint:', error);
      alert('❌ Error conectando con el backend de recetas');
    }
  };

  const testProductosEndpoint = async () => {
    try {
      console.log('🧪 Probando endpoint de productos...');
      const response = await productosService.listarProductos({
        page: 1,
        pagesize: 5
      });
      console.log('✅ Respuesta del endpoint:', response);
      alert(`✅ Endpoint funcionando! Total productos: ${response.total}`);
    } catch (error) {
      console.error('❌ Error en endpoint:', error);
      alert('❌ Error conectando con el backend de productos');
    }
  };

  return (
    <main>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <>
          <div style={{ 
            background: searchResults ? '#f0f9ff' : '#f9fafb', 
            padding: '12px', 
            borderRadius: '6px', 
            marginBottom: '16px',
            border: searchResults ? '1px solid #0ea5e9' : '1px solid #e5e7eb'
          }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>
              {searchResults ? '🔍 Resultados de búsqueda/filtro:' : '📦 Vista normal:'}
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}>
              Mostrando {productos.length} de {total} productos
              {!searchResults && ` (Página ${currentPage} de ${totalPages})`}
              {searchResults && (
                <span>
                  {searchResults.searchQuery && ` - Búsqueda: "${searchResults.searchQuery}"`}
                  {searchResults.tipoFilter && ` - Tipo: ${searchResults.tipoFilter}`}
                  {searchResults.totalPages > 1 && ` (Página ${searchResults.page} de ${searchResults.totalPages})`}
                </span>
              )}
            </p>
          </div>
          
          <ProductCardList products={productos} />
          
          {(!searchResults || (searchResults && searchResults.totalPages > 1)) && (
            <Pagination 
              currentPage={searchResults ? searchResults.page : currentPage}
              totalPages={searchResults ? searchResults.totalPages : totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </main>
  );
}
