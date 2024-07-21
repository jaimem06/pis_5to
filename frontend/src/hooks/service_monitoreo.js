import { GET } from './connection';
import Cookies from 'js-cookie';

export const obtenerProyeccionMonitoreo = async (token, steps) => {
    try {
        const response = await GET(`monitoreo/proyeccion/${steps}`);
        return response.data; 
    } catch (error) {
        console.log('Error al obtener proyección:', error);
        throw error; 
    }
};

export async function all_monitoreo() {
  let datos = null;
  try {
    const token = Cookies.get('token');
    datos = await GET('monitoreo', token);
  } catch (error) {
    console.log(error.response.data);
    return { code: 500, datos: [] };
  }
  return datos.data;
}

export async function monitoreo_tiempo_real() {
  let datos = null;
  try {
    const token = Cookies.get('token');
    datos = await GET('monitoreo/tiemporeal', token);
  } catch (error) {
    console.log(error.response.data);
    return { code: 500, datos: [] };
  }
  return datos.data;
}

export async function motas_activas() {
  let datos = null;
  try {
    const token = Cookies.get('token');
    datos = await GET('mota/activos', token);
  } catch (error) {
    console.log(error.response.data);
    return { code: 500, datos: [] };
  }
  return datos.data;
}