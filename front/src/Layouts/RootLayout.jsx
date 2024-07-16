import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import { useCard } from "../Components/CardProvider";
import AddDeviceCard from "../Components/AddDeviceCard";
import Card from "../Components/Card";
import HomeSVG from "../assets/HomeSVG";
import AlertsSVG from "../assets/AlertsSVG";
import AddDeviceSVG from "../assets/AddDeviceSVG";
import MapsSVG from "../assets/MapsSVG";
import ReportsSVG from "../assets/ReportsSVG";
import LoginSVG from "../assets/LoginSVG";
import Login from "../Pages/Login";
export default function RootLayout() {
  const { pathname } = useLocation();

  const { updateContent: setCardContent, toggleCard } = useCard();

  return (
    <div className="content">
      <div className="main">
        <Card />
        <Outlet />
      </div>

      <div className="navbar">
        <NavLink to="/home">
          <HomeSVG selected={pathname === "/home"} />
        </NavLink>
        <NavLink to="/alerts">
          <AlertsSVG selected={pathname === "/alerts"} />
        </NavLink>
        <div
          onClick={function () {
            setCardContent(<AddDeviceCard />);
            toggleCard();
          }}
        >
          <AddDeviceSVG />
        </div>
        {/* <NavLink to="/maps">
          <MapsSVG selected={pathname === "/maps"} />
        </NavLink>
        */}
        {/*<NavLink to="/reports">
          <ReportsSVG selected={pathname === "/reports"} />
        </NavLink>*/}
      </div>
    </div>
  );
}
