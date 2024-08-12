import { createSelector } from '@reduxjs/toolkit';

const SET_WISHLIST_PRODUCT = 'wishlist/setWishlistProduct';
const SET_WISHLIST_PRODUCTS = 'wishlist/setWishlistProducts';
const DELETE_WISHLIST_PRODUCT = 'wishlist/deleteWishlistProduct';

export const setWishlistProduct = (product) => ({
  type: SET_WISHLIST_PRODUCT,
  product,
});

export const setWishlistProducts = (products) => ({
  type: SET_WISHLIST_PRODUCTS,
  products,
});

export const deleteWishlistProduct = (productId) => ({
  type: DELETE_WISHLIST_PRODUCT,
  productId,
});

export const getUserWishlist = () => async (dispatch) => {
  const res = await fetch('/api/wishlist/current');
  if (res.ok) {
    const data = res.json();
    dispatch(setWishlistProducts(data));
    return data;
  }
};

const selectWishlistObj = (state) => state.wishlist;

export const selectWishlistProducts = createSelector([selectWishlistObj], (selectWishlistObj) => ({
  ...selectWishlistObj,
}));

const initialState = { products: {}, allIds: [] };

function wishlistReducer(state = structuredClone(initialState), action) {
  switch (action.type) {
    case SET_WISHLIST_PRODUCT: {
      const newState = structuredClone(state);
      if (action.product) {
        newState.products[action.product.id] = structuredClone(action.product);
        if (newState.allIds.indexOf(action.product.id) < 0) {
          newState.allIds.push(action.product.id);
        }
      }
      return newState;
    }
    case SET_WISHLIST_PRODUCTS: {
      const newState = structuredClone(state);
      action.wishlist.forEach((product) => {
        newState.products[product.id] = structuredClone(product);
        if (newState.allIds.indexOf(product.id) < 0) {
          newState.allIds.push(product.id);
        }
      });
      return newState;
    }
    case DELETE_WISHLIST_PRODUCT: {
      const newState = structuredClone(state);
      delete newState.products[action.productId];
      newState.allIds = newState.allIds.filter((id) => id !== action.productId);
      return newState;
    }
    default:
      return state;
  }
}

export default wishlistReducer;
