import { createSelector } from '@reduxjs/toolkit';

const ADD_TO_CART = 'cart/addToCart';
const REMOVE_FROM_CART = 'cart/removeFromCart';
const UPDATE_CART_QUANTITY = 'cart/updateCartQuantity';
const CLEAR_CART = 'cart/clearCart';
const SET_CART = 'cart/setCart';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  productId,
});

export const updateCartQuantity = (productId, quantity) => ({
  type: UPDATE_CART_QUANTITY,
  productId,
  quantity,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

export const getUserCart = (userId) => async (dispatch) => {
  const res = await fetch(`/api/cart/${userId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(setCart(data));
    return data;
  }
};

export const thunkAddToCart =
  (cartId, productId, quantity = 1) =>
  async (dispatch) => {
    const res = await fetch(`/api/cart/${cartId}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: productId,
        quantity: quantity,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(addToCart(data));
      return;
    }
  };

export const thunkRemoveFromCart = (cartId, productId) => async (dispatch) => {
  const res = await fetch(`/api/cart/${cartId}/items/${productId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(removeFromCart(productId));
    return data;
  }
};

export const thunkUpdateCartQuantity = (cartId, productId, quantity) => async (dispatch) => {
  const res = await fetch(`/api/cart/${cartId}/items/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity: quantity }),
  });

  if (res.ok) {
    dispatch(updateCartQuantity(productId, quantity));
  }
};

export const selectCart = (state) => state.cart;

export const selectCartDetails = createSelector([selectCart], (cart) => ({
  ...cart,
}));

const initialState = {
  products: {},
};

const cartReducer = (state = structuredClone(initialState), action) => {
  switch (action.type) {
    case SET_CART: {
      const newState = structuredClone(initialState);
      newState.products = [...action.cart.products];
      return { ...newState, ...action.cart };
    }
    case ADD_TO_CART: {
      const newState = structuredClone(state);
      const { id, quantity } = action.product;

      const validQuantity = parseInt(quantity, 10) || 1;

      const existingProductIndex = newState.products.findIndex((product) => product.id === id);

      if (existingProductIndex !== -1) {
        newState.products[existingProductIndex].quantity += validQuantity;
      } else {
        newState.products.push({ ...action.product, quantity: validQuantity });
      }

      return newState;
    }
    case REMOVE_FROM_CART: {
      // const newState = structuredClone(state);
      // const productIdx = newState.products.findIndex(
      //   (prod) => parseInt(prod.id) === parseInt(action.productId)
      // );
      // if (productIdx !== -1) {
      //   const removedProduct = newState.products[productIdx];

      //   newState.totalItems -= removedProduct.quantity;
      //   newState.totalPrice -= Number(removedProduct.product.price) * removedProduct.quantity;

      //   newState.products.splice(productIdx, 1);
      // }

      // return newState;
      const newState = structuredClone(state);

      // Remove the product from the cart if it exists
      newState.products = newState.products.filter((product) => product.id !== action.productId);

      return newState;
    }
    case UPDATE_CART_QUANTITY: {
      const newState = structuredClone(state);
      const product = newState.products.find((prod) => parseInt(prod.id) === parseInt(action.productId));

      if (product) {
        product.quantity = action.quantity;
      }

      return newState;
    }
    case CLEAR_CART: {
      return structuredClone(initialState);
    }
    default:
      return state;
  }
};

export default cartReducer;
