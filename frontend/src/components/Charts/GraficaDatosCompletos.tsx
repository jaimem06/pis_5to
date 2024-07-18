import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { all_monitoreo } from "@/hooks/service_monitoreo";

interface DataPoint {
  dato: number;
  fecha: string;
  hora: string;
}

const GraficaDatosCompletos: React.FC = () => {
  const [aguaData, setAguaData] = useState<DataPoint[]>([]);
  const [aireData, setAireData] = useState<DataPoint[]>([]);
  const [chartHeight, setChartHeight] = useState<number>(310);

  useEffect(() => {
    const fetchDatosMonitoreo = async () => {
      try {
        const response = await all_monitoreo();
        if (response && response.datos) {
          setAguaData(response.datos.Agua || []);
          setAireData(response.datos.Aire || []);
        }
      } catch (error) {
        console.error("Error al obtener los datos de monitoreo:", error);
      }
    };

    fetchDatosMonitoreo();
  }, []);

  const transformDataToChart = (data: DataPoint[]) => {
    return data.map((point) => ({
      x: `${point.fecha} ${point.hora}`,
      y: point.dato
    }));
  };

  const series = [
    {
      name: "Agua",
      data: transformDataToChart(aguaData)
    },
    {
      name: "Aire",
      data: transformDataToChart(aireData)
    }
  ];

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#5750F1", "#0ABEF9"],
    fill: {
      type: "solid",
      opacity: 0.5,
    },
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: chartHeight,
      type: "area",
      animations: {
        enabled: true
      }
    },
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 5,
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy HH:mm:ss'
      },
      shared: true,
      followCursor: true
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    yaxis: {
      title: {
        text: 'Valor en PPM',
        style: {
          fontSize: '12px',
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Grafica de los datos completos:
        </h4>
      </div>
      <div className="relative overflow-x-auto">
        {(aguaData.length > 0 || aireData.length > 0) ? (
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={chartHeight}
          />
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
};

export default GraficaDatosCompletos;