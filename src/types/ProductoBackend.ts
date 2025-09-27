// Enum de tipos de productos
export const TipoProductoBackend = {
  Antibiotico: 'Antibiotico',
  Antiinflamatorio: 'Antiinflamatorio',
  Antihistaminico: 'Antihistaminico',
  Antimicotico: 'Antimicotico',
  Dermocosmetica: 'Dermocosmetica',
  Antigripal: 'Antigripal',
  Analgesico: 'Analgesico',
  Vitaminas: 'Vitaminas',
  Broncodilatador: 'Broncodilatador',
  Antiacido: 'Antiacido'
} as const;

export type TipoProductoBackend = typeof TipoProductoBackend[keyof typeof TipoProductoBackend];

// Interfaces para productos
export interface Producto {
  id: number;
  nombre: string;
  tipo: string;
  precio: number;
  stock: number;
  requiere_receta: boolean;
}

export interface ListarProductosParams {
  page?: number;
  pagesize?: number;
}

export interface ListarPorNombreParams {
  nombre: string;
  page?: number;
  pagesize?: number;
}

export interface ListarPorTipoParams {
  tipo: string;
  page?: number;
  pagesize?: number;
}

export interface ListarConRecetaParams {
  requiere_receta: boolean;
  page?: number;
  pagesize?: number;
}

export interface ListarPorStockParams {
  minimo: number;
  page?: number;
  pagesize?: number;
}

export interface ProductosResponse {
  productos: Producto[];
  total: number;
  page: number;
  pagesize: number;
}

export interface CrearProductoData {
  nombre: string;
  tipo: string;
  precio: number;
  stock: number;
  requiere_receta: boolean;
}

export interface ActualizarProductoData extends CrearProductoData {}