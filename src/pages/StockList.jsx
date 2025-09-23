import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/styles.css";

const StockList = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:2207/api/stock")
      .then(res => setItems(res.data))
      .catch(err => console.error("Error fetching stock:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2207/api/stock/${id}`);
      alert("Item Deleted Successfully");
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Item not deleted");
    }
  };

  return (
    <div className="table-container">
      <h2>Stock List</h2>
      <button className="add-new" onClick={() => navigate("/dashboard/addstock")}>
        Add New Item
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>
                <button className="primary" onClick={() => navigate(`/dashboard/updatestock/${item.id}`)}>
                  <FaEdit /> Update
                </button>
                <button className="secondary" onClick={() => handleDelete(item.id)}>
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No stock items available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
