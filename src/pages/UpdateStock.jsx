import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/styles.css";

const AddStock = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0); // if your Stock has price
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:2207/api/stock', { name, quantity, price });
      alert("Item added successfully");
      navigate('/dashboard/stocks');
    } catch (err) {
      console.error(err);
      alert("Failed to add item");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Stock Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
        <button type="submit" className="primary">Add Item</button>
        <button
          type="button"
          className="secondary"
          onClick={() => navigate('/dashboard/stocks')}
          style={{ marginLeft: '10px' }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddStock;
