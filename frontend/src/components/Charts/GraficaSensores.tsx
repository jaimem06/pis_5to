import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { obtenerProyeccionMonitoreo } from "@/hooks/service_monitoreo";
import Cookies from "js-cookie";

const GraficaSensores: React.FC = () => {
  const [proyeccion, setProyeccion] = useState<any>(null);
  const [projectionSteps, setProjectionSteps] = useState<number>(3);
  const token = Cookies.get("token");

  const categories = Array.from({ length: projectionSteps }, (_, i) => `Día ${i + 1}`);

  useEffect(() => {
    const fetchProyeccion = async () => {
      try {
        const data = await obtenerProyeccionMonitoreo(token, projectionSteps);
        console.log(data);
        setProyeccion(data.proyecciones);
      } catch (error) {
        console.error("Error al obtener la proyección:", error);
      }
    };

    if (projectionSteps >= 2) {
      fetchProyeccion();
    }
  }, [projectionSteps]);

  const transformDataToTimeUnit = (data: any) => {
    const transformedData: any = {
      agua: [],
      aire: [],
    };
    if (data.agua && Array.isArray(data.agua)) {
      transformedData.agua = data.agua;
    }
    if (data.aire && Array.isArray(data.aire)) {
      transformedData.aire = data.aire;
    }
    return transformedData;
  };

  const series = proyeccion ? [
    {
      name: "Agua",
      data: transformDataToTimeUnit(proyeccion).agua.map((val: number) => Math.round(val * 100) / 100),
    },
    {
      name: "Aire",
      data: transformDataToTimeUnit(proyeccion).aire.map((val: number) => Math.round(val * 100) / 100),
    },
  ] : [];

  const options: ApexOptions = {
    chart: {
      type: 'area',
      fontFamily: 'Satoshi, sans-serif',
      animations: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: categories,
      labels: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: 'Partes por millón',
      }
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} ppm`
      }
    },
    colors: ["#5750F1", "#0ABEF9"],
    fill: {
      type: 'solid',
      opacity: 0.6,
    }
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">Proyección de los datos:</h4>
        <div>
          <h1>Numero de días:</h1>
          <input
            style={{ borderRadius: "5px", color: "black", textAlign: "center" }}
            type="number"
            value={projectionSteps}
            onChange={(e) => setProjectionSteps(Math.max(2, Number(e.target.value)))}
            className="form-input"
          />
        </div>
      </div>
      {proyeccion ? (
        <ReactApexChart options={options} series={series} type="area" height={350} />
      ) : (
        <p>Cargando proyección...</p>
      )}
    </div>
  );
};

export default GraficaSensores;