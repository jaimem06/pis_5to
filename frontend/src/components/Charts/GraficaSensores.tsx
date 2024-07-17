import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { obtenerProyeccionMonitoreo } from "@/hooks/service_monitoreo";
import Cookies from "js-cookie";

const GraficaSensores: React.FC = () => {
  const [proyeccion, setProyeccion] = useState<any>(null);
  const [projectionSteps, setProjectionSteps] = useState<number>(3); 
  const token = Cookies.get("token");

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


  const handleProjectionStepsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue >= 2) {
      setProjectionSteps(newValue);
    } else {
      console.error('Solo valores iguales o mayores a 2 son permitidos.');
    }
  };

  const categories = Array.from({ length: projectionSteps }, (_, i) => (i + 1).toString());
  const series = proyeccion ? [
    {
      name: "agua",
      data: transformDataToTimeUnit(proyeccion).agua.map(
        (val: number) => Math.round(val * 100) / 100
      ),
    },
    {
      name: "aire",
      data: transformDataToTimeUnit(proyeccion).aire.map(
        (val: number) => Math.round(val * 100) / 100
      ),
    },
  ] : [];

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#5750F1", "#0ABEF9"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "area",
      toolbar: {
        show: true,
        tools: {
          zoom: true,
          zoomin: true,
          zoomout: true,
        },
      },
    },
    fill: {
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 320,
          },
        },
      },
    ],
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    grid: {
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
    xaxis: {
      type: "category",
      categories: categories, 
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        rotate: -45, // Rotar etiquetas para mejorar la legibilidad
        formatter: function (value: string, timestamp: number, opts: any) {
          return (timestamp % 10 === 0) ? value : ""; // Mostrar solo cada décima etiqueta
        }
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Datos recabados:
          </h4>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="projection-steps">Cantidad de días para proyección: </label>
        <input
          id="projection-steps"
          type="number"
          min="1"
          max="100"
          value={projectionSteps}
          onChange={handleProjectionStepsChange}
          className="ml-2 p-1 border rounded"
        />
      </div>
      <div className="relative overflow-x-auto">
        <div
          className="-ml-4 -mr-5"
        >
          {proyeccion ? (
            <ReactApexChart
              options={{
                ...options,
                xaxis: {
                  ...options.xaxis,
                  categories: categories,
                },
              }}
              series={series}
              type="area"
            />
          ) : (
            <p>Cargando proyección...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GraficaSensores;
