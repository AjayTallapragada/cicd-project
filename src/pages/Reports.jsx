import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line } from "recharts";

const Reports = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Fetch stock data
    axios.get("http://localhost:2501/api/stock")
      .then(res => setStocks(res.data))
      .catch(err => console.error("Error fetching stock:", err));
  }, []);

  // Pie chart data (Low stock vs sufficient)
  const pieData = [
    { name: "Low Stock (<10)", value: stocks.filter(s => s.quantity < 10).length },
    { name: "Sufficient Stock", value: stocks.filter(s => s.quantity >= 10).length }
  ];
  const COLORS = ["#e74c3c", "#2ecc71"];

  // Bar chart data (Item quantities)
  const barData = stocks.map(s => ({ name: s.name, quantity: s.quantity }));

  // Line chart data (Simulated stock value trend)
  const lineData = stocks.map(s => ({ name: s.name, value: s.quantity * s.price }));

  return (
    <div style={{ padding: "20px" }}>
      <h2>Stock Reports</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", marginTop: "30px" }}>
        {/* Pie Chart */}
        <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
          <h3>Low vs Sufficient Stock</h3>
          <PieChart width={300} height={300}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
          <h3>Item Quantities</h3>
          <BarChart width={400} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#3498db" />
          </BarChart>
        </div>

        {/* Line Chart */}
        <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
          <h3>Stock Value Trend</h3>
          <LineChart width={400} height={300} data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#e67e22" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Reports;
