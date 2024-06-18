import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title:
  "PIS 5to Dashboard",
  description: "Proyecto integrador del 5to ciclo de la carrera de Ingeniería en Computación.",
};

const PageAdminUser = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Admin Usuarios" />
        <p>Aqui Tabla para Adminitrar Usuarios</p>
      </div>
    </DefaultLayout>
  );
};

export default PageAdminUser;
