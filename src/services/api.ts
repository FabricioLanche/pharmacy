import axios from 'axios';
import type { AxiosInstance } from 'axios';

// Configuración base para diferentes backends
const createApiInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor para agregar token de autenticación si existe
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('pharmacy-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor para manejar respuestas
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Manejar errores globalmente
      if (error.response?.status === 401) {
        // Token inválido o expirado
        localStorage.removeItem('pharmacy-token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Instancias específicas para cada backend
export const recetasApi = createApiInstance(
  import.meta.env.VITE_RECETAS_API_URL || 'http://localhost:3001/api'
);

// Preparado para futuros backends
export const productosApi = createApiInstance(
  import.meta.env.VITE_PRODUCTOS_API_URL || 'http://localhost:3002/api'
);

export const usuariosApi = createApiInstance(
  import.meta.env.VITE_USUARIOS_API_URL || 'http://localhost:3003/api'
);

// Exportar por defecto la instancia de recetas para compatibilidad
export default recetasApi;
