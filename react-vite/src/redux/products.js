import { createSelector } from '@reduxjs/toolkit';
import { getUserWishlist } from './wishlist';
import { addProductImage } from './productImages';

const ADD_PRODUCT = 'products/addProduct';
const EDIT_PRODUCT = 'products/editProduct';
const SET_PRODUCTS = 'products/setProducts';
const SET_PRODUCT = 'products/setProduct';
const DELETE_PRODUCT = 'products/deleteProduct';
const WISHLIST_PRODUCT = 'products/wishlistProduct';
const REMOVE_PRODUCT_FROM_WISHLIST = 'products/removeProductFromWishlist';

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

const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});

const wishlistProduct = (productId) => ({
  type: WISHLIST_PRODUCT,
  productId,
});

const removeProductFromWishlist = (productId) => ({
  type: REMOVE_PRODUCT_FROM_WISHLIST,
  productId,
});

export const addNewProduct = (product, image) => async (dispatch) => {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });

  if (res.ok) {
    const product = await res.json();
    dispatch(addProduct(product));

    const formData = new FormData();
    formData.append('image', image);

    const imageRes = await fetch(`/api/products/${product.id}/product-images`, {
      method: 'POST',
      body: formData,
    });

    if (imageRes.ok) {
      const image = await imageRes.json();
      dispatch(addProductImage(image));
      return product;
    }
  }
};

export const editProductById = (productId, data) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
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

export const wishlistNewProduct = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}/wishlist`, {
    method: 'POST',
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(getProductDetailsById(productId));
    return data;
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
    default:
      return state;
  }
};

export default productsReducer;
