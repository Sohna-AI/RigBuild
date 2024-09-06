import { createSelector } from '@reduxjs/toolkit';
import { getUserWishlist } from './wishlist';

const ADD_PRODUCT = 'products/addProduct';
const EDIT_PRODUCT = 'products/editProduct';
const SET_PRODUCTS = 'products/setProducts';
const SET_PRODUCT = 'products/setProduct';
const DELETE_PRODUCT = 'products/deleteProduct';
const SET_USER_PRODUCTS = 'products/setUserProducts';

const addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

const editProduct = (product) => ({
  type: EDIT_PRODUCT,
  product,
});

const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

const setProduct = (product) => ({
  type: SET_PRODUCT,
  product,
});

const setUserProducts = (products) => ({
  type: SET_USER_PRODUCTS,
  products,
});

const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});

export const getUserProducts = () => async (dispatch) => {
  const res = await fetch('/api/products/current');

  if (res.ok) {
    const products = await res.json();
    await dispatch(setUserProducts(products));
    return products;
  }
};

export const fetchProducts =
  (searchQuery = '') =>
  async (dispatch) => {
    const response = await fetch(`/api/products?search=${searchQuery}`);

    if (response.ok) {
      const data = await response.json();
      dispatch(setProducts(data));
      return data;
    }
  };

export const addNewProduct = (product) => async (dispatch) => {
  const res = await fetch('/api/products/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (res.ok) {
    const product = await res.json();
    dispatch(addProduct(product));
    return product;
  } else if (res.status < 500) {
    const errorMessages = await res.json();
    return { errors: errorMessages };
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const editProductById = (productId, data) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const product = await res.json();
    await dispatch(editProduct(product));
    return product;
  } else if (res.status < 500) {
    const errorMessages = await res.json();
    return { errors: errorMessages };
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const getProducts = () => async (dispatch) => {
  const res = await fetch('/api/products/');

  if (res.ok) {
    const list = await res.json();
    dispatch(setProducts(list));
    return list;
  }
};

export const getProductDetailsById = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`);

  if (res.ok) {
    const product = await res.json();
    dispatch(setProduct(product));
    return product;
  }
};

export const deleteProductById = (productId, current) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteProduct(productId));
    if (current) dispatch(getUserProducts());
    else dispatch(getProducts());
    return data;
  }
};

export const wishlistNewProduct = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}/wishlist`, {
    method: 'POST',
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(getProductDetailsById(productId));
    return data;
  } else if (res.status < 500) {
    const errorMessages = await res.json();
    return { errors: errorMessages };
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const unWishlistProduct = (productId, details) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}/wishlist`, {
    method: 'DELETE',
  });
  if (res.ok) {
    const data = await res.json();
    if (details) dispatch(getProductDetailsById(productId));
    else dispatch(getUserWishlist());
    return data;
  }
};
const selectProductsObj = (state) => state.products;

export const selectProducts = createSelector([selectProductsObj], (selectProductsObj) => ({
  ...selectProductsObj,
}));

const initialState = {
  products: {},
  allIds: [],
};

const productsReducer = (state = structuredClone(initialState), action) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      const newState = structuredClone(state);
      newState.products[action.product.id] = structuredClone(action.product);
      if (newState.allIds.indexOf(action.product.id) < 0) {
        newState.allIds.push(action.product.id);
      }
      return newState;
    }
    case EDIT_PRODUCT: {
      const newState = structuredClone(state);
      newState.products[action.product.id] = structuredClone(action.product);
      return newState;
    }
    case SET_USER_PRODUCTS: {
      const newState = structuredClone(initialState);
      action.products.products.forEach((product) => {
        newState.products[product.id] = structuredClone(product);
        if (newState.allIds.indexOf(product.id) < 0) newState.allIds.push(product.id);
      });
      return newState;
    }
    case SET_PRODUCTS: {
      const newState = structuredClone(state);
      action.products.products.forEach((product) => {
        newState.products[product.id] = structuredClone(product);
        if (newState.allIds.indexOf(product.id) < 0) newState.allIds.push(product.id);
      });
      return newState;
    }
    case SET_PRODUCT: {
      const newState = structuredClone(state);
      newState.products[action.product.id] = structuredClone(action.product);
      if (newState.allIds.indexOf(action.product.id) < 0) {
        newState.allIds.push(action.product.id);
      }
      return newState;
    }
    case DELETE_PRODUCT: {
      const newState = structuredClone(state);
      delete newState.products[action.productId];
      newState.allIds = newState.allIds.filter((id) => id !== action.productId);
      return newState;
    }
    default:
      return state;
  }
};

export default productsReducer;
