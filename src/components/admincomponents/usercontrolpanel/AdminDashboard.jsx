import React from 'react';
import AdminSideBar from './sidebaradmin/AdminSideBar';
import { Outlet } from 'react-router-dom';
import "../../../css/admi/sidebarAdmi.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-layout">
      <AdminSideBar />
      <div className="admin-dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
