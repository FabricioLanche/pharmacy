import React, { useRef } from 'react';

const FloatingUploadButton: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Por ahora solo mostramos el nombre del archivo, sin lógica adicional
    if (e.target.files && e.target.files[0]) {
      alert(`Archivo seleccionado: ${e.target.files[0].name}`);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <button
        onClick={handleClick}
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: '#2563eb',
          color: 'white',
          border: 'none',
          boxShadow: '0 2px 8px #0003',
          fontSize: 32,
          zIndex: 1000,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Subir PDF"
        title="Subir documento PDF"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V6M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
};

export default FloatingUploadButton;
