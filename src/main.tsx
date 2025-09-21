import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'


import AppRouter from './AppRouter'
import { AuthProvider } from './hooks/useAuthContext';
import { CartProvider } from './hooks/useCartContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
