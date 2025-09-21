import type { Producto } from '../types/Producto';
import { TipoProducto } from '../types/Producto';

export const productsData: Producto[] = [
  {
    id: 'prod-001',
    tipo: TipoProducto.Medicina,
    stock: 50,
    nombre: 'Paracetamol',
    precio: 3.5
  },
  {
    id: 'prod-002',
    tipo: TipoProducto.Suplemento,
    stock: 20,
    nombre: 'Vitamina C',
    precio: 5.0
  },
  {
    id: 'prod-003',
    tipo: TipoProducto.Medicina,
    stock: 15,
    nombre: 'Ibuprofeno',
    precio: 4.2
  },
  {
    id: 'prod-004',
    tipo: TipoProducto.Medicina,
    stock: 30,
    nombre: 'Amoxicilina',
    precio: 8.0
  },
  {
    id: 'prod-005',
    tipo: TipoProducto.Suplemento,
    stock: 10,
    nombre: 'Omega 3',
    precio: 12.5
  },
  {
    id: 'prod-006',
    tipo: TipoProducto.Medicina,
    stock: 25,
    nombre: 'Aspirina',
    precio: 2.8
  },
  {
    id: 'prod-007',
    tipo: TipoProducto.Medicina,
    stock: 40,
    nombre: 'Loratadina',
    precio: 6.0
  },
  {
    id: 'prod-008',
    tipo: TipoProducto.Suplemento,
    stock: 18,
    nombre: 'Calcio',
    precio: 7.5
  },
  {
    id: 'prod-009',
    tipo: TipoProducto.Medicina,
    stock: 12,
    nombre: 'Metformina',
    precio: 9.0
  },
  {
    id: 'prod-010',
    tipo: TipoProducto.Medicina,
    stock: 22,
    nombre: 'Omeprazol',
    precio: 11.0
  }
];
