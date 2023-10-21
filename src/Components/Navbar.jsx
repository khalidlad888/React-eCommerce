import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./Navbar.css"

const Navbar = () => {
  const cart = useSelector(state => state.cart.cartItems);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">Amazing!</Link>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Add Product</Link>
          </li>
          <li>
            <Link to="/cart">Cart ({cart.length})</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
