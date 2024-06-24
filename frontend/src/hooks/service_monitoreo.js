import { GET } from './connection'; 

export const obtenerProyeccionMonitoreo = async (token, steps = 20) => {
    try {
        const response = await GET(`monitoreo/proyeccion?steps=${steps}`);
        return response.data; 
    } catch (error) {
        console.log('Error al obtener proyección:', error);
        throw error; 
    }
};