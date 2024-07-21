'use client';
import React, { useState, useEffect } from 'react';
import { all_monitoreo, desactivar ,activar} from '@/hooks/service_monitoreo';
import { FiSlash, FiCheck } from 'react-icons/fi';

interface Sensor {
  estado: boolean;
  external_id: string;
  id: number;
  dato: string;
  fecha: Date;
  hora: Date;
}

const TableMonitoreo: React.FC = () => {
  const [sensors, setSensors] = useState<{ Agua: Sensor[], Aire: Sensor[] }>({ Agua: [], Aire: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selection, setSelection] = useState<'Agua' | 'Aire'>('Agua');
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    try {
      const response = await all_monitoreo();
      if (response.code && response.code === 200) {
        setSensors({ Agua: response.datos.Agua, Aire: response.datos.Aire });
      } else {
        throw new Error(response.msg || 'Error al cargar los datos');
      }
    } catch (error: any) {
      setError(error.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);
  

  const handleSelectionChange = (newSelection: 'Agua' | 'Aire') => {
    setSelection(newSelection);
  };

  const filteredSensors = sensors[selection].filter(sensor =>
    sensor.dato.toString().includes(searchTerm) ||
    sensor.fecha.toString().includes(searchTerm) ||
    sensor.hora.toString().includes(searchTerm)
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full p-2 border rounded-md"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mb-4 flex justify-between">
      <div>
        <button
          onClick={() => setSelection('Agua')}
          className={`px-4 py-2 ${selection === 'Agua' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} rounded-md hover:bg-blue-700 hover:text-white`}
        >
          Agua
        </button>
        <button
          onClick={() => setSelection('Aire')}
          className={`ml-2 px-4 py-2 ${selection === 'Aire' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} rounded-md hover:bg-blue-700 hover:text-white`}
        >
          Aire
        </button>
      </div>
    </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto text-center">
          <thead>
            <tr className="dark:bg-dark-2">
              <th className="px-4 py-4 font-medium dark:text-white">Dato</th>
              <th className="px-4 py-4 font-medium dark:text-white">Fecha</th>
              <th className="px-4 py-4 font-medium dark:text-white">Hora</th>
              <th className="px-4 py-4 font-medium dark:text-white">Estado</th>
              <th className="px-4 py-4 font-medium dark:text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredSensors.map(sensor => (
              <tr key={sensor.id}>
                <td className="px-4 py-4 dark:border-dark-3 border-b">{sensor.dato}</td>
                <td className="px-4 py-4 dark:border-dark-3 border-b">{sensor.fecha.toString()}</td>
                <td className="px-4 py-4 dark:border-dark-3 border-b">{sensor.hora.toString()}</td>
                <td className="px-4 py-4 dark:border-dark-3 border-b">
                  <span className={`px-2 py-1 rounded-full text-white ${sensor.estado ? 'bg-green-500' : 'bg-red-500'}`}>
                    {sensor.estado ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-4 py-4 dark:border-dark-3 border-b flex flex-col items-center">
                  {sensor.estado ? (
                    <button
                      onClick={() => {
                        const confirmar = window.confirm("¿Deseas desactivar?");
                        if (confirmar) {
                          desactivar({ external_id: sensor.external_id });
                          loadData();
                        }
                      }}
                      className="text-white bg-red-500 hover:bg-red-700 rounded-md p-2"
                    >
                      <FiSlash size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const confirmar = window.confirm("¿Deseas activar?");
                        if (confirmar) {
                          activar({ external_id: sensor.external_id });
                          loadData();
                        }
                      }}
                      className="text-white bg-green-500 hover:bg-green-700 rounded-md p-2"
                    >
                      <FiCheck size={20} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default TableMonitoreo;
