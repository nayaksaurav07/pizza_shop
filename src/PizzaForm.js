// PizzaForm.js
import React, { useState } from 'react';

const PizzaForm = ({ placeOrder }) => {
  const [pizza, setPizza] = useState({
    type: 'Veg',
    size: 'Large',
    base: 'Thin',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPizza({ ...pizza, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder(pizza);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Type:
        <select name="type" value={pizza.type} onChange={handleChange}>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
      </label>
      <label>
        Size:
        <select name="size" value={pizza.size} onChange={handleChange}>
          <option value="Large">Large</option>
          <option value="Medium">Medium</option>
          <option value="Small">Small</option>
        </select>
      </label>
      <label>
        Base:
        <select name="base" value={pizza.base} onChange={handleChange}>
          <option value="Thin">Thin</option>
          <option value="Thick">Thick</option>
        </select>
      </label>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default PizzaForm;
