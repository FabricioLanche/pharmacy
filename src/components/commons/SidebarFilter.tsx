import React from "react";
import { TipoProducto } from "../../types/Producto";

interface SidebarFilterProps {
  tipos: TipoProducto[];
  selectedTipo: TipoProducto | null;
  onSelect: (tipo: TipoProducto | null) => void;
  open: boolean;
  onClose: () => void;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({ tipos, selectedTipo, onSelect, open, onClose }) => {
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
            onClick={() => onSelect(null)}
          >
            Todos
          </button>
        </li>
        {tipos.map((tipo) => (
          <li key={tipo}>
            <button
              className={`w-full text-left px-2 py-1 rounded ${selectedTipo === tipo ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"}`}
              onClick={() => onSelect(tipo)}
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
