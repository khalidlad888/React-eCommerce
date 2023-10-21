import { createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../../fetchAPI';

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const products = await getProducts();
    dispatch(setProducts(products));
    dispatch(setLoading(false))
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: true
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
    },
    updateProduct: (state, action) => {
      const { id } = action.payload;
      const existingProduct = state.products.find((product) => product.id === id);
      if (existingProduct) {
        Object.assign(existingProduct, action.payload);
      }
    },
    deleteProduct: (state, action) => {
      const id  = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
    }
  }
});

export const { setProducts, addProduct, updateProduct, deleteProduct, setLoading} = productSlice.actions;
export const productsReducer = productSlice.reducer;
export const productSelector = (state) => state.products.products;
