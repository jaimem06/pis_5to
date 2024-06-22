"use client";

import TableThree from "@/components/Tables/TableThree";
import { listar_personas } from "@/hooks/servicio_persona";
import { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const PageAdminUser = () => {
  let [persona, setPersona] = useState([]);
 
  useEffect(() => {
    listar_personas().then((res) => {
      if (res && res.code === 200) {
        setPersona(res.datos);
      }else{
        console.log("Error");
      }
    });
  }, []);

  console.log(persona);

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Admin Usuarios" />
        <TableThree data={persona} />
      </div>
    </DefaultLayout>
  );
};

export default PageAdminUser;
