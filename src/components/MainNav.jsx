import React from "react";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
// import NavBarNew from "./NavBarNew";

const MainNav = (props) => {
  const isAuth = useSelector((state) => state.login.isAuth);
  return (
    <div>
      {isAuth && <NavBar></NavBar>}
      {props.children}
    </div>
  );
};

export default MainNav;
