import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddStock = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:2501/api/stock', { name, quantity, price });
      alert("Item added Successfully");
      navigate('/dashboard/stocks');
    } catch (err) {
      console.error(err);
      alert("Item not added");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Stock Item</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Quantity</label>
          <input 
            type="number" 
            value={quantity} 
            onChange={e => setQuantity(e.target.value)} 
            required 
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Price</label>
          <input 
            type="number" 
            value={price} 
            onChange={e => setPrice(e.target.value)} 
            required 
          />
        </div>
        <button className="add-new" type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddStock;
