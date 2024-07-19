'use client';
import React, { useState, useEffect } from 'react';
import { motas } from '@/hooks/Service_mota';
import { FiEdit } from 'react-icons/fi';
import Link from 'next/link';

interface Sensor {
  estado: boolean;
  external_id: string;
  id: number;
  ip_sensor: string;
  latitud: number;
  longitud: number;
  tipo: string;
  enlace: string;
}

const TableMota: React.FC = () => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await motas();
        if (data.code && data.code !== 200) {
          throw new Error(data.msg || 'Error al cargar los datos');
        }
        setSensors(data);
      } catch (error: any) {
        setError(error.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredSensors = sensors.filter(sensor =>
    sensor.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sensor.enlace.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sensor.latitud.toString().includes(searchTerm) ||
    sensor.longitud.toString().includes(searchTerm) ||
    sensor.estado.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="mb-4 flex justify-between">
        <Link href="/admin-sensor/new" className="text-blue-500 hover:text-blue-700">
          <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
            Crear Nueva Mota
          </button>
        </Link>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full p-2 border rounded-md"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto text-center">
          <thead>
            <tr className="dark:bg-dark-2">
              <th className="px-4 py-4 font-medium dark:text-white">IP de Mota</th>
              <th className="px-4 py-4 font-medium dark:text-white">Tipo Sensor</th>
              <th className="px-4 py-4 font-medium dark:text-white">Enlace</th>
              <th className="px-4 py-4 font-medium dark:text-white">Latitud</th>
              <th className="px-4 py-4 font-medium dark:text-white">Longitud</th>
              <th className="px-4 py-4 font-medium dark:text-white">Estado</th>
              <th className="px-4 py-4 font-medium dark:text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredSensors.map(sensor => (
              <tr key={sensor.id}>
                <td className="px-4 py-4 dark:border-dark-3 border-b">{sensor.ip_sensor}</td>
                <td className="px-4 py-4 dark:border-dark-3 border-b">{sensor.tipo}</td>
                <td className="px-4 py-4 dark:border-dark-3 border-b">{sensor.enlace}</td>
                <td className="px-4 py-4 dark:border-dark-3 border-b">{sensor.latitud}</td>
                <td className="px-4 py-4 dark:border-dark-3 border-b">{sensor.longitud}</td>
                <td className="px-4 py-4 dark:border-dark-3 border-b">
                  <span className={`px-2 py-1 rounded-full text-white ${sensor.estado ? 'bg-green-500' : 'bg-red-500'}`}>
                    {sensor.estado ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-4 py-4 dark:border-dark-3 border-b">
                  <div className="flex justify-center">
                    <Link href={`/admin-sensor/${sensor.external_id}`} className="text-blue-500 hover:text-blue-700 flex justify-center items-center">
                      <FiEdit size={20} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableMota;