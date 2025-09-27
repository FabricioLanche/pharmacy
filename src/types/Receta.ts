export interface Receta {
  _id: string;
  pacienteDNI: string;
  medicoCMP: string;
  fechaEmision: Date;
  productos: {
    productoId: string;
    cantidad: number;
    dosis?: string;
    indicaciones?: string;
  }[];
  archivoPDF?: string;
  estadoValidacion: 'pendiente' | 'validada' | 'rechazada';
  createdAt: Date;
  updatedAt: Date;
}

export type EstadoValidacionReceta = 'pendiente' | 'validada' | 'rechazada';

// Interfaces para servicios de recetas
export interface ListarRecetasParams {
  dni?: string;
  cmp?: string;
  estado?: EstadoValidacionReceta;
  fechaDesde?: string;
  fechaHasta?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface ListarRecetasResponse {
  page: number;
  limit: number;
  total: number;
  items: Receta[];
}

export interface RecetaRespuesta {
  mensaje: string;
  receta: Receta;
}

export interface UploadRecetaData {
  archivoPDF: File;
  pacienteDNI: string;
  medicoCMP: string;
  fechaEmision: string;
  productos: Array<{
    codigoProducto: string;
    nombre: string;
    cantidad: number;
  }>;
}

export interface ArchivoUrlResponse {
  url: string;
  expires?: number;
}