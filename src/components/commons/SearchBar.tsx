import { useState, useRef, useCallback } from 'react';
import { productosService } from '../../services/productosService';
import type { Producto } from '../../types/ProductoBackend';

interface SearchBarProps {
  onResults: (results: Producto[], search: string) => void;
  onLoading?: (loading: boolean) => void;
}

export default function SearchBar({ onResults, onLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const debounceRef = useRef<number | null>(null);

  // Función de búsqueda memoizada
  const searchProducts = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim()) {
      try {
        onLoading?.(true);
        
        const response = await productosService.listarPorNombre({
          nombre: searchQuery.trim(),
          page: 1,
          pagesize: 25
        });
        
        onResults(response.productos, searchQuery);
      } catch (error) {
        console.error('Error buscando productos:', error);
        onResults([], searchQuery);
      } finally {
        onLoading?.(false);
      }
    } else {
      // Si no hay query, limpiar resultados
      onResults([], '');
      onLoading?.(false);
    }
  }, [onResults, onLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Limpiar el timeout anterior
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Crear nuevo timeout
    debounceRef.current = setTimeout(() => {
      searchProducts(value);
    }, 500);
  };

  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      value={query}
      onChange={handleChange}
      style={{ 
        padding: '0.5rem', 
        minWidth: 200,
        borderRadius: 4,
        border: '1px solid #ccc'
      }}
    />
  );
}