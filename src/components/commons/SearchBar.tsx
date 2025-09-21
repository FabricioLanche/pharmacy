import { useState } from 'react';
import { productsData } from '../../assets/productsData';

interface SearchBarProps {
  onResults: (results: typeof productsData, search: string) => void;
}

export default function SearchBar({ onResults }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    // Ya no filtramos aquí, solo notificamos el texto
    onResults([], value);
  };

  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      value={query}
      onChange={handleChange}
      style={{ padding: '0.5rem', minWidth: 200 }}
    />
  );
}
