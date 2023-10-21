import React from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import { productSelector } from '../features/product/productSlice';
import { useSelector } from 'react-redux';


const ProductDetails = () => {
  const { productId } = useParams();
  const products = useSelector(productSelector);

  if (!products) {
    return <div>Loading...</div>;
  }

  const product = products.find(item => item.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-info">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Price: {product.price}</p>
        <p>Category: {product.category}</p>
        <p>Rating: {product.rating}</p>
      </div>
    </div>
  );
};

export default ProductDetails;