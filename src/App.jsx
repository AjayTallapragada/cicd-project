import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import StockList from "./pages/StockList";
import About from "./pages/AboutUs";
import Reports from "./pages/Reports"; // Add this if you created Reports.jsx

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected dashboard layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="stocks" element={<StockList />} />
          <Route path="about" element={<About />} />
          <Route path="reports" element={<Reports />} /> {/* Optional */}
        </Route>

        {/* Default route → redirect to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
