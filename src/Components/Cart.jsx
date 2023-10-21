import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartSelector } from '../features/cart/cartSlice';
import './Cart.css';
import { removeFromCart } from '../features/cart/cartSlice';

const Cart = () => {
  const cartItems = useSelector(cartSelector);

  const dispatch = useDispatch();

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
    alert("Item Removed from Cart");
  };

  const handleOrder = (itemId) => {
    dispatch(removeFromCart(itemId));
    alert("Your Order is Placed");
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>Price: {item.price}</p>
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
                <button onClick={() => handleOrder(item.id)}>Place Your Order</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;