import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Producto } from '../types/Producto';

export interface CartItem {
  producto: Producto;
  cantidad: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; producto: Producto; cantidad: number }
  | { type: 'REMOVE_ITEM'; productoId: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; items: CartItem[] };

const CartContext = createContext<{
  cart: CartState;
  addItem: (producto: Producto, cantidad: number) => void;
  removeItem: (productoId: string) => void;
  clearCart: () => void;
  checkout: () => void;
} | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.producto.id === action.producto.id);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.producto.id === action.producto.id
              ? { ...i, cantidad: i.cantidad + action.cantidad }
              : i
          ),
        };
      }
      return { items: [...state.items, { producto: action.producto, cantidad: action.cantidad }] };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter(i => i.producto.id !== action.productoId) };
    case 'CLEAR_CART':
      return { items: [] };
    case 'SET_CART':
      return { items: action.items };
    default:
      return state;
  }
}

const CART_STORAGE_KEY = 'pharmacy_cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  // Hidratar desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        const items: CartItem[] = JSON.parse(stored);
        dispatch({ type: 'SET_CART', items });
      } catch {}
    }
  }, []);

  // Persistir en localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.items));
  }, [cart.items]);

  const addItem = (producto: Producto, cantidad: number) => {
    dispatch({ type: 'ADD_ITEM', producto, cantidad });
  };
  const removeItem = (productoId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productoId });
  };
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  const checkout = () => {
    // Aquí podrías implementar lógica de compra
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}
