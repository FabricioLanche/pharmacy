import { createContext, useContext, useState } from 'react';
import { usersData } from '../assets/usersData';
import type { Usuario } from '../types/Usuario';

interface AuthContextType {
  user: Usuario | null;
  token: string | null;
  login: (correo: string, contrasena: string) => boolean;
  register: (data: Omit<Usuario, 'id'>) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function fakeJWT(user: Usuario) {
  return btoa(JSON.stringify({ correo: user.correo, id: user.id, time: Date.now() }));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (correo: string, contrasena: string) => {
    const found = usersData.find(u => u.correo === correo && u.contrasena === contrasena);
    if (found) {
      const jwt = fakeJWT(found);
      setUser(found);
      setToken(jwt);
      localStorage.setItem('pharmacy-token', jwt);
      return true;
    }
    return false;
  };

  const register = (data: Omit<Usuario, 'id'>) => {
    if (usersData.some(u => u.correo === data.correo)) return false;
    const newUser: Usuario = { ...data, id: 'user-' + (usersData.length + 1) };
    usersData.push(newUser);
    const jwt = fakeJWT(newUser);
    setUser(newUser);
    setToken(jwt);
    localStorage.setItem('pharmacy-token', jwt);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('pharmacy-token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
