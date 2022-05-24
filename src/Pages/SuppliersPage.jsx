import React from "react";

import { useSelector } from "react-redux";
import SupplierTable from "../components/Tables/SupplierTable";
import PageHeader from "../components/PageHeader";

const SuppliersPage = () => {
  const isAuth = useSelector((state) => state.login.isAuth);

  return (
    <>
      {isAuth && (
        <>
          <PageHeader pagetitle="Suppliers Page" />
          <SupplierTable />
        </>
      )}
    </>
  );
};

export default SuppliersPage;
