import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';
import { productSelector } from '../features/product/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, updateProduct, deleteProduct } from '../features/product/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import { fetchProducts } from '../features/product/productSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';


const Products = () => {
  const products = useSelector(productSelector);
  const dispatch = useDispatch();
  const [editedProduct, setEditedProduct] = useState(null);
  const loading = useSelector((state) => state.products.loading);


  const handleEdit = (product) => {
    setEditedProduct({ ...product });
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
    alert('Product deleted successfully');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = () => {
    dispatch(updateProduct(editedProduct));
    setEditedProduct(null);
    alert('Product updated successfully');
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert('Product added to cart');
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="rating-star">★</span>);
      } else {
        stars.push(<span key={i} className="grey-star">★</span>);
      }
    }
    return stars;
  };

  const sortByPrice = () => {
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => a.price - b.price);
    dispatch(setProducts(sortedProducts));
  };

  const resetSort = () => {
    dispatch(fetchProducts());
  };

  return (
    <div>
      {loading === true ? <h2>...Loading</h2> :
        <div className='btn-div'>
          <button onClick={resetSort}>Reset Sort</button>
          <button onClick={sortByPrice}>Sort by Price</button>
        </div>}

      <div className="product-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {editedProduct && editedProduct.id === product.id ? (
              <div className="edit-form">
                Title -
                <input
                  type="text"
                  name="title"
                  value={editedProduct.title}
                  onChange={handleInputChange}
                />
                <br />
                Description -
                <input
                  type="text"
                  name="description"
                  value={editedProduct.description}
                  onChange={handleInputChange}
                />
                <br />
                Rating -
                <input
                  type="number"
                  name="rating"
                  value={editedProduct.rating}
                  onChange={handleInputChange}
                />
                <br />
                Price -
                <input
                  type="number"
                  name="price"
                  value={editedProduct.price}
                  onChange={handleInputChange}
                />
                <br />
                Image URL -
                <input
                  type="text"
                  name="image"
                  value={editedProduct.image}
                  onChange={handleInputChange}
                />
                <br />
                Category -
                <input
                  type="text"
                  name="category"
                  value={editedProduct.category}
                  onChange={handleInputChange}
                />
                <br />
                <button onClick={handleSave}>Save</button>
              </div>

            ) : (
              <>
                <Link to={`/products/${product.id}`} className="product-link">
                  <img src={product.image} alt={product.title} className="product-image" />
                  <p className="product-name">{product.title}</p>
                </Link>
                <p>{product.description}</p>
                <p className="product-price">{product.price}</p>
                <div className="product-rating">
                  <span>Rating:</span>
                  {renderStars(product.rating)}
                </div>
                <p className="product-category">Category: {product.category}</p>
                <div className='addCart-div'>
                  <FaEdit onClick={() => handleEdit(product)} className="edit-icon" />
                  <FaTrash onClick={() => handleDelete(product.id)} className="delete-icon" />
                  <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
