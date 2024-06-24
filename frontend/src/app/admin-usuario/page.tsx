"use client";

import TableThree from "@/components/Tables/TableThree";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const PageAdminUser = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Admin Usuarios" />
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default PageAdminUser;
