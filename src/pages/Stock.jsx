
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Stock = () => {
  const items = [
    { id: 1, name: 'Item 1', quantity: 10, price: 100 },
    { id: 2, name: 'Item 2', quantity: 20, price: 200 },
    { id: 3, name: 'Item 3', quantity: 30, price: 300 },
  ];

  return (
    <div>
      <h1>Stock</h1>
      <button>Add Item</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>
                <button><FaEdit /></button>
                <button><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;
