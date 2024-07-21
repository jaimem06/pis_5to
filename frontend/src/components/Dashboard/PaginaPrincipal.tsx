"use client";
import React from "react";
import GraficaSensoresV2 from "@/components/Graficas/GraficaSensoresV2";
import GraficaSensores from "@/components/Graficas/GraficaSensores";
import GraficaDatosCompletos from "@/components/Graficas/GraficaDatosCompletos";
import GraficaTiempoReal from "../Graficas/GraficaTiempoReal";

const PaginaPrincipal: React.FC = () => {
  return (
    <>
      <GraficaTiempoReal />
      <GraficaDatosCompletos />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <GraficaSensores />
        <GraficaSensoresV2 />
      </div>
    </>
  );
};

export default PaginaPrincipal;