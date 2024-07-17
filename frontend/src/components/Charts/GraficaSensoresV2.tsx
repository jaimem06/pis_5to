import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { all_monitoreo } from "@/hooks/service_monitoreo";
import Cookies from "js-cookie";

const GraficaSensoresV2: React.FC = () => {
  const [aguaCount, setAguaCount] = useState<number>(0);
  const [aireCount, setAireCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonitoreo = async () => {
      try {
        const data = await all_monitoreo();
        
        if (data && data.datos) {
          const aguaCount = data.datos.agua ? data.datos.agua.length : 0;
          const aireCount = data.datos.aire ? data.datos.aire.length : 0;
          setAguaCount(aguaCount);
          setAireCount(aireCount);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos de monitoreo:", error);
        setLoading(false);
      }
    };

    fetchMonitoreo();
  }, []);

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: ["#5750F1", "#0ABEF9"], // Cambiar colores: Agua (azul), Aire (celeste)
    labels: ["Agua", "Aire"],
    legend: {
      show: false,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          background: "transparent",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Datos",
              fontSize: "16px",
              fontWeight: "400",
            },
            value: {
              show: false,
              fontSize: "28px",
              fontWeight: "bold",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 415,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <div className="mb-9 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Datos recabados
          </h4>
        </div>
      </div>

      <div className="mb-8">
        <div className="mx-auto flex justify-center">
          {loading ? (
            <p>Cargando datos...</p>
          ) : (
            <ReactApexChart options={options} series={[aguaCount, aireCount]} type="donut" />
          )}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[350px]">
        <div className="-mx-7.5 flex flex-wrap items-center justify-center gap-y-2.5">
          <div className="w-full px-7.5 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full" style={{ backgroundColor: "#5750F1" }}></span> {/* Color para Agua */}
              <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                <span> Agua </span>
                <span> {aguaCount} registros </span>
              </p>
            </div>
          </div>
          <div className="w-full px-7.5 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full" style={{ backgroundColor: "#0ABEF9" }}></span> {/* Color para Aire */}
              <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                <span> Aire </span>
                <span> {aireCount} registros </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficaSensoresV2;
