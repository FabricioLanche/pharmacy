import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', margin: '20px 0' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: '8px 12px',
          border: '1px solid #ddd',
          background: currentPage === 1 ? '#f5f5f5' : 'white',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          borderRadius: '4px'
        }}
      >
        ← Anterior
      </button>

      {getVisiblePages().map((page, index) => {
        if (page === '...') {
          return (
            <span key={`dots-${index}`} style={{ padding: '8px 4px' }}>
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              background: currentPage === page ? '#2563eb' : 'white',
              color: currentPage === page ? 'white' : 'black',
              cursor: 'pointer',
              borderRadius: '4px',
              minWidth: '40px'
            }}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: '8px 12px',
          border: '1px solid #ddd',
          background: currentPage === totalPages ? '#f5f5f5' : 'white',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          borderRadius: '4px'
        }}
      >
        Siguiente →
      </button>
    </div>
  );
};

export default Pagination;