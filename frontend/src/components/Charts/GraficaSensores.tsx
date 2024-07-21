import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { obtenerProyeccionMonitoreo } from "@/hooks/service_monitoreo";
import Cookies from "js-cookie";

const GraficaSensores: React.FC = () => {
  const [proyeccion, setProyeccion] = useState<any>(null);
  const [projectionSteps, setProjectionSteps] = useState<number>(3);
  const [selectedDate, setSelectedDate] = useState<string>('');
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

  const handleProjectionStepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSteps = Math.min(Math.max(2, Number(e.target.value)), 730); // Limit to max 730 days
    setProjectionSteps(newSteps);
  };

  const handleProjectionStepsBlur = () => {
    if (projectionSteps < 2) {
      setProjectionSteps(2);
    } else if (projectionSteps > 730) {
      setProjectionSteps(730);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);

    if (date) {
      const currentDate = new Date();
      const selectedDate = new Date(date);
      const differenceInDays = Math.ceil((selectedDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      if (differenceInDays >= 2 && differenceInDays <= 730) {
        setProjectionSteps(differenceInDays);
      } else {
        console.error('La fecha seleccionada debe ser al menos 2 días en el futuro y no más de 2 años.');
        setSelectedDate(''); // Reset the selected date if it's invalid
      }
    }
  };

  // Calcula la fecha máxima para el input de fecha
  const currentDate = new Date();
  const maxDate = new Date(currentDate);
  maxDate.setFullYear(currentDate.getFullYear() + 2);
  const maxDateString = maxDate.toISOString().split('T')[0];

  const series = proyeccion ? [
    {
      name: "Aire",
      data: transformDataToTimeUnit(proyeccion).aire.map((val: number) => Math.round(val * 100) / 100),
    },
    {
      name: "Agua",
      data: transformDataToTimeUnit(proyeccion).agua.map((val: number) => Math.round(val * 100) / 100),
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
    yaxis: [
      {
        title: {
          text: 'Partes por millón',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Calidad del aire (AQI)',
        },
      }
    ],
    tooltip: {
      y: {
        formatter: (val, { seriesIndex, dataPointIndex, w }) => {
          const seriesName = w.globals.seriesNames[seriesIndex];
          let estado = '';
          if (seriesName === 'Aire') {
            if (val <= 700) {
              estado = 'Calidad: Excelente';
            } else if (val > 700 && val <= 1100) {
              estado = 'Calidad: Buena';
            } else if (val > 1100 && val <= 1600) {
              estado = 'Calidad: Mala';
            } else if (val > 1600) {
              estado = 'Calidad: Muy Mala';
            }
          } else if (seriesName === 'Agua') {
            if (val <= 300) {
              estado = 'Calidad: Excelente';
            } else if (val > 300 && val <= 600) {
              estado = 'Calidad: Buena';
            } else if (val > 600 && val <= 900) {
              estado = 'Calidad: Regular';
            } else if (val > 900 && val <= 1200) {
              estado = 'Calidad: Mala';
            } else if (val > 1200) {
              estado = 'Calidad: Muy Mala';
            }
          }
          return `${val} ppm - ${estado}`;
        }
      }
    },
    colors: ["#0ABEF9", "#5750F1"],
    fill: {
      type: 'solid',
      opacity: 0.6,
    }
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <div className="mb-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">Proyección de los datos:</h4>
        <div className="flex items-center gap-4">
          <div>
            <h1>Días:</h1>
            <input
              style={{ width: "80px", borderRadius: "5px", color: "black", textAlign: "center" }}
              type="number"
              value={projectionSteps}
              onChange={handleProjectionStepsChange}
              onBlur={handleProjectionStepsBlur}
              className="form-input"
            />
          </div>
          <div>
            <h1>Seleccionar fecha:</h1>
            <input
              style={{ borderRadius: "5px", color: "black", textAlign: "center" }}
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="form-input"
              min={currentDate.toISOString().split('T')[0]} // Fecha mínima es la fecha actual
              max={maxDateString} // Fecha máxima es 2 años en el futuro
            />
          </div>
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
