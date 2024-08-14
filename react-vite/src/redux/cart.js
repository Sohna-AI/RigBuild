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
    dispatch(removeFromCart(productId));
  }
};

export const thunkUpdateCartQuantity = (cartId, productId, quantity) => async (dispatch) => {
  const res = await fetch(`/api/cart/${cartId}/items/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });

  if (res.ok) {
    dispatch(updateCartQuantity(productId, quantity));
  }
};

const selectCart = (state) => state.cart;

export const selectCartDetails = createSelector([selectCart], (cart) => ({
  ...cart,
}));

const initialState = {
  products: {},
  totalItems: 0,
  totalPrice: 0,
};

const cartReducer = (state = structuredClone(initialState), action) => {
  switch (action.type) {
    case SET_CART: {
      const newState = structuredClone(initialState);
      const cartItems = action.cart.products;
      cartItems.forEach((item) => {
        newState.products[item.product_id] = {
          ...item.product,
          quantity: item.quantity || 1,
        };
        newState.totalItems += item.quantity || 1;
        newState.totalPrice += (item.product.price || 0) * (item.quantity || 1);
      });
      return {
        ...newState,
        ...action.cart,
      };
    }
    case ADD_TO_CART: {
      const newState = structuredClone(state);
      const { id, price, quantity } = action.product;

      if (newState.products[id]) {
        newState.products[id].quantity += quantity;
      } else {
        newState.products[id] = { ...action.product };
      }

      newState.totalItems += quantity;
      newState.totalPrice += price * quantity;

      return newState;
    }
    case REMOVE_FROM_CART: {
      const newState = structuredClone(state);
      const removedProduct = newState.products[action.productId];

      if (removedProduct) {
        newState.totalItems -= removedProduct.quantity;
        newState.totalPrice -= removedProduct.price * removedProduct.quantity;
        delete newState.products[action.productId];
      }

      return newState;
    }
    case UPDATE_CART_QUANTITY: {
      const newState = structuredClone(state);
      const product = newState.products[action.productId];

      if (product) {
        const quantityDifference = action.quantity - product.quantity;
        product.quantity = action.quantity;
        newState.totalItems += quantityDifference;
        newState.totalPrice += quantityDifference * product.price;
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
