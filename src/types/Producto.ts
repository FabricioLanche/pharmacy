export const TipoProducto = {
  Medicina: 'medicina',
  Suplemento: 'suplemento'
} as const;

export type TipoProducto = typeof TipoProducto[keyof typeof TipoProducto];

export interface Producto {
  id: string;
  tipo: TipoProducto;
  stock: number;
  nombre: string;
  precio: number;
}