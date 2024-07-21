import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableMonitoreo from "@/components/Tables/TableMonitoreo";

export const metadata: Metadata = {
  title:
  "PIS 5to Dashboard",
  description: "Proyecto integrador del 5to ciclo de la carrera de Ingeniería en Computación.",
};

const PageAdminMonitoreo = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Admintracion de Sensores" />
      </div>
      <TableMonitoreo/>
    </DefaultLayout>
  );
};

export default PageAdminMonitoreo;
