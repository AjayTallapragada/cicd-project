import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/styles.css";

const DashboardLayout = () => {
  const navigate = useNavigate();

  // Login check
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Inventory</h2>
        <ul>
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/dashboard/stocks">Stock List</Link></li>
          <li><Link to="/dashboard/addstock">Add Stock</Link></li>
          <li><Link to="/dashboard/reports">Reports</Link></li>
          <li><Link to="/dashboard/about">About</Link></li>
        </ul>
        <button 
          className="secondary" 
          style={{ marginTop: "30px", width: "100%" }} 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
