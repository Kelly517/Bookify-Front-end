import React, { useState } from "react";
import SideBar from "../components/sidebarcomponents/SideBar.jsx";
import { Outlet, NavLink } from "react-router-dom";
import NavBarHome from "../components/homecomponents/NavBarHome.jsx";
import "../css/sidebar/sidebarAll.css"

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <NavBarHome />
      <div className="dashboard-main">
        <aside className="dashboard-sidebar">
          <SideBar />
        </aside>
        <section className="dashboard-content">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
