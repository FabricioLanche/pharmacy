import { recetasApi } from './api';
import type { 
  Receta, 
  EstadoValidacionReceta,
  ListarRecetasParams,
  ListarRecetasResponse,
  RecetaRespuesta,
  UploadRecetaData,
  ArchivoUrlResponse
} from '../types/Receta';

// Servicios de recetas
export const recetasService = {
  // Listar recetas con filtros y paginación
  async listarRecetas(params: ListarRecetasParams = {}): Promise<ListarRecetasResponse> {
    const response = await recetasApi.get('/recetas', { params });
    return response.data;
  },

  // Subir receta con PDF
  async subirReceta(data: UploadRecetaData): Promise<RecetaRespuesta> {
    const formData = new FormData();
    formData.append('archivoPDF', data.archivoPDF);
    formData.append('pacienteDNI', data.pacienteDNI);
    formData.append('medicoCMP', data.medicoCMP);
    formData.append('fechaEmision', data.fechaEmision);
    formData.append('productos', JSON.stringify(data.productos));

    const response = await recetasApi.post('/recetas/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Validar receta (CMP y DNI)
  async validarReceta(id: string): Promise<RecetaRespuesta> {
    const response = await recetasApi.post(`/recetas/validacion/${id}`);
    return response.data;
  },

  // Actualizar estado de validación
  async actualizarEstado(id: string, estadoValidacion: EstadoValidacionReceta): Promise<RecetaRespuesta> {
    const response = await recetasApi.patch(`/recetas/estado/${id}`, {
      estadoValidacion,
    });
    return response.data;
  },

  // Obtener URL del PDF de la receta
  async obtenerUrlArchivo(id: string, direct: boolean = false, expires: number = 300): Promise<ArchivoUrlResponse> {
    const response = await recetasApi.get(`/recetas/archivo/${id}`, {
      params: { direct: direct.toString(), expires },
    });
    return response.data;
  },

  // Eliminar archivo PDF de una receta
  async eliminarArchivo(id: string): Promise<RecetaRespuesta> {
    const response = await recetasApi.delete(`/recetas/archivo/${id}`);
    return response.data;
  },

  // Obtener receta por ID
  async obtenerRecetaPorId(id: string): Promise<Receta> {
    const response = await recetasApi.get(`/recetas/${id}`);
    return response.data;
  },
};

export default recetasService;