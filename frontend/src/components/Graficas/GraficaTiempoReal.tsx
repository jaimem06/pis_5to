import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { monitoreo_tiempo_real, motas_activas } from "@/hooks/service_monitoreo";

interface DataPoint {
  dato: number;
  fecha: string;
  hora: string;
}

const MAX_DATA_POINTS = 10;

const GraficaTiempoReal: React.FC = () => {
  const [aguaData, setAguaData] = useState<{ x: string, y: number }[]>([]);
  const [aireData, setAireData] = useState<{ x: string, y: number }[]>([]);
  const [esp32AireData, setEsp32AireData] = useState<{ x: string, y: number }[]>([]);
  const [activeSensors, setActiveSensors] = useState<string[]>([]);

  useEffect(() => {
    const fetchMotasActivas = async () => {
      try {
        const response = await motas_activas();
        console.log("Motas activas:", response); // Depuración
        if (response && response.datos) {
          const activeEnlaces = response.datos.map((mota: any) => mota.enlace);
          setActiveSensors(activeEnlaces);
        }
      } catch (error) {
        console.error("Error al obtener las motas activas:", error);
      }
    };

    const fetchDatosMonitoreo = async () => {
      try {
        const response = await monitoreo_tiempo_real();
        console.log("Datos de la API:", response); // Depuración
        if (response && response.data) {
          if (response.data["sensor/agua/ESP32_Agua"]) {
            setAguaData(prevData => updateDataQueue(prevData, transformDataToChart(response.data["sensor/agua/ESP32_Agua"])));
          }
          if (response.data["sensor/aire/ESP32_Aire"]) {
            setAireData(prevData => updateDataQueue(prevData, transformDataToChart(response.data["sensor/aire/ESP32_Aire"])));
          }
          if (response.data["sensor/aire/ESP32_Aire"]) {
            setEsp32AireData(prevData => updateDataQueue(prevData, transformDataToChart(response.data["sensor/aire/ESP32_Aire"])));
          }
        }
      } catch (error) {
        console.error("Error al obtener los datos de monitoreo:", error);
      }
    };

    fetchMotasActivas();
    fetchDatosMonitoreo();
    const interval = setInterval(fetchDatosMonitoreo, 15000); // Actualizar cada 15 segundos
    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  const updateDataQueue = (data: { x: string, y: number }[], newData: { x: string, y: number }) => {
    if (data.length >= MAX_DATA_POINTS) {
      return [...data.slice(1), newData];
    }
    return [...data, newData];
  };

  const transformDataToChart = (data: DataPoint) => {
    const now = new Date();
    const fecha = now.toISOString().split('T')[0];
    const hora = now.toTimeString().split(' ')[0];
    return {
      x: `${fecha} ${hora}`,
      y: data.dato
    };
  };

  const commonOptions: ApexOptions = {
    legend: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: 0.4,
    },
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 250,
      type: "area",
      animations: {
        enabled: true
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      offsetX: -10, // Ajusta el gráfico hacia la izquierda
      offsetY: -10, // Ajusta el gráfico hacia arriba
    },
    stroke: {
      curve: "smooth",
    },
/*     markers: {
      size: 5,
      colors: ["#000524"],
      strokeWidth: 3
    }, */
    dataLabels: {
      enabled: false
    },
    tooltip: {
      x: {
        format: 'HH:mm:ss'
      },
      shared: true,
      followCursor: true
    },
    xaxis: {
      type: "datetime",
      labels: {
        show: false, // Oculta las etiquetas del eje X
        datetimeUTC: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => value.toFixed(0), // Muestra los valores del eje Y como enteros
      },
    },
    grid: {
      show: false
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        horizontal: false,
      }
    }
  };

  const optionsAgua = {
    ...commonOptions,
    colors: ["#5750F1"],
  };

  const optionsAire = {
    ...commonOptions,
    colors: ["#0ABEF9"],
  };

  const optionsEsp32Aire = {
    ...commonOptions,
    colors: ["#FF5733"],
  };

  const renderChartOrMessage = (data: { x: string, y: number }[], options: ApexOptions, sensorName: string, sensorLink: string) => {
    return activeSensors.includes(sensorLink) ? (
      data.length > 0 ? (
        <ReactApexChart
          options={options}
          series={[{ name: sensorName, data }]}
          type="area"
          height={250}
        />
      ) : (
        <p className="text-center mt-4">Sensor desconectado, revisar configuración del sensor.</p>
      )
    ) : (
      <div className="flex items-center justify-center h-full">
        <p className="bg-red-600 text-white text-lg font-bold p-4 rounded">
          Mota inactiva
        </p>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="col-span-1 rounded-[10px] bg-white p-6 shadow-md dark:bg-gray-dark dark:shadow-card mb-4">
        <h4 className="text-lg font-bold text-dark dark:text-white mb-4">Datos de Agua:</h4>
        {renderChartOrMessage(aguaData, optionsAgua, "Agua", "sensor/agua/ESP32_Agua")}
      </div>
      <div className="col-span-1 rounded-[10px] bg-white p-6 shadow-md dark:bg-gray-dark dark:shadow-card mb-4">
        <h4 className="text-lg font-bold text-dark dark:text-white mb-4">Datos de Aire:</h4>
        {renderChartOrMessage(aireData, optionsAire, "Aire", "sensor/aire/ESP32_Aire")}
      </div>
      <div className="col-span-1 rounded-[10px] bg-white p-6 shadow-md dark:bg-gray-dark dark:shadow-card mb-4">
        <h4 className="text-lg font-bold text-dark dark:text-white mb-4">Datos de ESP32 Aire:</h4>
        {renderChartOrMessage(esp32AireData, optionsEsp32Aire, "ESP32 Aire", "sensor/aire/ESP32_Aire")}
      </div>
    </div>
  );
};

export default GraficaTiempoReal;