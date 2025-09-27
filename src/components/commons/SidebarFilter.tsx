import React from "react";
import { TipoProductoBackend } from "../../types/ProductoBackend";
import { productosService } from "../../services/productosService";
import type { Producto } from "../../types/ProductoBackend";

interface SidebarFilterProps {
  selectedTipo: string | null;
  onSelect: (tipo: string | null) => void;
  onResults: (productos: Producto[]) => void;
  onLoading?: (loading: boolean) => void;
  open: boolean;
  onClose: () => void;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({ 
  selectedTipo, 
  onSelect, 
  onResults, 
  onLoading, 
  open, 
  onClose 
}) => {
  // Obtener los tipos disponibles del enum
  const tiposDisponibles = Object.values(TipoProductoBackend);

  const handleTipoSelect = async (tipo: string | null) => {
    try {
      onLoading?.(true);
      onSelect(tipo);

      if (tipo) {
        // Buscar productos por tipo
        const response = await productosService.listarPorTipo({
          tipo,
          page: 1,
          pagesize: 100 // Mostrar más productos cuando se filtra por tipo
        });
        onResults(response.productos);
      } else {
        // Mostrar todos los productos
        const response = await productosService.listarProductos({
          page: 1,
          pagesize: 25
        });
        onResults(response.productos);
      }
    } catch (error) {
      console.error('Error filtrando por tipo:', error);
      onResults([]);
    } finally {
      onLoading?.(false);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
      style={{ boxShadow: open ? "2px 0 8px rgba(0,0,0,0.1)" : undefined }}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <span className="font-bold text-lg">Filtrar por tipo</span>
        <button onClick={onClose} className="text-2xl font-bold">&times;</button>
      </div>
      <ul className="p-4 space-y-2">
        <li>
          <button
            className={`w-full text-left px-2 py-1 rounded ${selectedTipo === null ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"}`}
            onClick={() => handleTipoSelect(null)}
          >
            Todos
          </button>
        </li>
        {tiposDisponibles.map((tipo) => (
          <li key={tipo}>
            <button
              className={`w-full text-left px-2 py-1 rounded ${selectedTipo === tipo ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"}`}
              onClick={() => handleTipoSelect(tipo)}
            >
              {tipo}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarFilter;
