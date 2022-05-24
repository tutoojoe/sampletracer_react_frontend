import React from "react";
import { useSelector } from "react-redux";
import PageHeader from "../components/PageHeader";
import MerchandiserTable from "../components/Tables/MerchandiserTable";

const MerchandiserPage = () => {
  const isAuth = useSelector((state) => state.login.isAuth);
  return (
    <>
      {isAuth && (
        <>
          <PageHeader pagetitle="Merchandisers Page" />
          <MerchandiserTable />
        </>
      )}
    </>
  );
};

export default MerchandiserPage;
