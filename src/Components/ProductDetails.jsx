//importing React
import React from 'react';
//import useSeelector hook from redux
import { useSelector } from 'react-redux';
//importing useParams from react router dom
import { useParams } from 'react-router-dom';
import { productSelector } from '../features/product/productSlice';
//import css
import './ProductDetails.css';

//function form ProductDetails component
const ProductDetails = () => {
  //geting product id from params
  const { productId } = useParams();
  //getting products form state
  const products = useSelector(productSelector);

  //handling error for products not found
  if (!products) {
    return <div>Loading...</div>;
  }

  //finding the product form state using id in params
  const product = products.find(item => item.id === parseInt(productId));

  //if product not found handling component
  if (!product) {
    return <h2>Product not found</h2>;
  }

  //if product found showing details of the product
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

//exporting Product Details component
export default ProductDetails;