import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaList, FaChartPie, FaInfoCircle } from "react-icons/fa";
import "../styles/styles.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2501/api/stock")
      .then((res) => setStocks(res.data))
      .catch((err) => console.error("Error fetching stock:", err));
  }, []);

  // Summary calculations
  const totalItems = stocks.length;
  const totalQuantity = stocks.reduce((acc, item) => acc + item.quantity, 0);
  const totalValue = stocks.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const lowStock = stocks.filter((item) => item.quantity < 10).length;

  return (
    <div className="main-content">
      <h2>Welcome to Inventory Dashboard</h2>

      {/* Summary Cards */}
      <div className="summary-cards" style={{ display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
        <div className="card" style={{ flex: 1, textAlign: "center", backgroundColor: "#3498db", color: "white" }}>
          <h3>Total Items</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{totalItems}</p>
        </div>
        <div className="card" style={{ flex: 1, textAlign: "center", backgroundColor: "#2ecc71", color: "white" }}>
          <h3>Total Quantity</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{totalQuantity}</p>
        </div>
        <div className="card" style={{ flex: 1, textAlign: "center", backgroundColor: "#e67e22", color: "white" }}>
          <h3>Total Value</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>${totalValue}</p>
        </div>
        <div className="card" style={{ flex: 1, textAlign: "center", backgroundColor: "#e74c3c", color: "white" }}>
          <h3>Low Stock Items</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{lowStock}</p>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="quick-actions" style={{ display: "flex", gap: "15px", marginBottom: "30px", flexWrap: "wrap" }}>
        <button className="add-new" onClick={() => navigate("/dashboard/addstock")}>
          <FaPlus /> Add Stock
        </button>
        <button className="primary" onClick={() => navigate("/dashboard/stocks")}>
          <FaList /> View Stock List
        </button>
        <button className="secondary" onClick={() => navigate("/dashboard/about")}>
          <FaInfoCircle /> About
        </button>
        {/* Placeholder for Chart page */}
        <button className="primary" onClick={() => navigate("/dashboard/reports")}>
          <FaChartPie /> Reports
        </button>
      </div>

      {/* Recent Stock Table */}
      <div className="table-container">
        <h3>Recent Stock Items</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {stocks.slice(0, 5).map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
              </tr>
            ))}
            {stocks.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No stock items available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
