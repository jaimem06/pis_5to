import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { all_monitoreo } from "@/hooks/service_monitoreo";
import Cookies from "js-cookie";

const GraficaDatosCompletos: React.FC = () => {
  const [aguaData, setAguaData] = useState<any[]>([]);
  const [aireData, setAireData] = useState<any[]>([]);
  const [chartHeight, setChartHeight] = useState<number>(310);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchDatosMonitoreo = async () => {
      try {
        const data = await all_monitoreo();
        console.log("Datos recibidos del servidor:", data);
        
        // Verifica si data.datos.agua es un array antes de asignarlo al estado
        if (Array.isArray(data.datos.agua)) {
          setAguaData(data.datos.agua);
        } else {
          console.error("Datos de monitoreo de agua no son un array:", data.datos.agua);
        }

        // Verifica si data.datos.aire es un array antes de asignarlo al estado
        if (Array.isArray(data.datos.aire)) {
          setAireData(data.datos.aire);
        } else {
          console.error("Datos de monitoreo de aire no son un array:", data.datos.aire);
        }
      } catch (error) {
        console.error("Error al obtener los datos de monitoreo:", error);
      }
    };

    fetchDatosMonitoreo();
  }, []);

  const transformDataToTimeUnit = (data: any[]) => {
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map((dato, index) => ({
      x: index, // Ajusta esto según sea necesario para tu gráfico
      y: dato
    }));
  };

  const series = [
    {
      name: "agua",
      data: transformDataToTimeUnit(aguaData)
    },
    {
      name: "aire",
      data: transformDataToTimeUnit(aireData)
    }
  ];

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#5750F1", "#0ABEF9"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: chartHeight,
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
      type: "datetime",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
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