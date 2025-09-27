import { productosApi } from './api';
import type { 
  Producto,
  ListarProductosParams,
  ListarPorNombreParams,
  ListarPorTipoParams,
  ListarConRecetaParams,
  ListarPorStockParams,
  ProductosResponse,
  CrearProductoData,
  ActualizarProductoData
} from '../types/ProductoBackend';

// Servicios de productos
export const productosService = {
  // Listar productos con paginación
  async listarProductos(params: ListarProductosParams = {}): Promise<ProductosResponse> {
    const response = await productosApi.get('/productos', { params });
    return response.data;
  },

  // Listar productos por nombre con paginación
  async listarPorNombre(params: ListarPorNombreParams): Promise<ProductosResponse> {
    const response = await productosApi.get('/productos/nombre', { params });
    return response.data;
  },

  // Listar productos por tipo con paginación
  async listarPorTipo(params: ListarPorTipoParams): Promise<ProductosResponse> {
    const response = await productosApi.get('/productos/tipo', { params });
    return response.data;
  },

  // Listar productos con/sin receta con paginación
  async listarConReceta(params: ListarConRecetaParams): Promise<ProductosResponse> {
    const response = await productosApi.get('/productos/receta', { params });
    return response.data;
  },

  // Listar productos con stock bajo con paginación
  async listarPorStock(params: ListarPorStockParams): Promise<ProductosResponse> {
    const response = await productosApi.get('/productos/stock-bajo', { params });
    return response.data;
  },

  // Crear producto
  async crearProducto(data: CrearProductoData): Promise<Producto> {
    const response = await productosApi.post('/productos', data);
    return response.data;
  },

  // Obtener producto por ID
  async obtenerProductoPorId(id: number): Promise<Producto> {
    const response = await productosApi.get(`/productos/${id}`);
    return response.data;
  },

  // Actualizar producto
  async actualizarProducto(id: number, data: ActualizarProductoData): Promise<Producto> {
    const response = await productosApi.put(`/productos/${id}`, data);
    return response.data;
  },

  // Eliminar producto
  async eliminarProducto(id: number): Promise<void> {
    await productosApi.delete(`/productos/${id}`);
  },
};

export default productosService;