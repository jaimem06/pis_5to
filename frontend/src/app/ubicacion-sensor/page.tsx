import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title:
  "PIS 5to Dashboard",
  description: "Proyecto integrador del 5to ciclo de la carrera de Ingeniería en Computación.",
};

const PageUbicacionSensores = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Ubicacion Sensores" />
        <p>Aqui Mapa para ver Ubicacion de Sensores</p>
      </div>
    </DefaultLayout>
  );
};

export default PageUbicacionSensores;
