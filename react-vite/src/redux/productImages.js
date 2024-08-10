import { createSelector } from '@reduxjs/toolkit';

const SET_PRODUCT_IMAGES = 'productImages/setProductImages';
const ADD_PRODUCT_IMAGE = 'productImages/addProductImage';
const EDIT_PRODUCT_IMAGE = 'productImages/editProductImage';
const DELETE_PRODUCT_IMAGE = 'productImages/deleteProductImage';

export const setProductImages = (productImages) => ({
  type: SET_PRODUCT_IMAGES,
  productImages,
});

export const addProductImage = (product_image) => ({
  type: ADD_PRODUCT_IMAGE,
  product_image,
});

export const editProductImage = (product_image_id) => ({
  type: EDIT_PRODUCT_IMAGE,
  product_image_id,
});

export const deleteProductImage = (productImageId) => ({
  type: DELETE_PRODUCT_IMAGE,
  productImageId,
});

export const getProductImages = () => async (dispatch) => {
  const res = await fetch(`/api/product-images/`);

  if (res.ok) {
    const data = await res.json();
    dispatch(setProductImages(data));
    return data;
  }
};

export const addNewProductImage = (productId, image) => async (dispatch) => {
  const formData = new FormData();
  formData.append('image', image);

  const res = await fetch(`/api/products/${productId}/product-images`, {
    method: 'POST',
    body: formData,
  });

  if (res.ok) {
    const productImage = await res.json();
    dispatch(addProductImage(productImage));
  }
};

export const editProductImageById = (productImageId, image) => async (dispatch) => {
  const formData = new FormData();
  formData.append('image', image);

  const res = await fetch(`/api/product-images/${productImageId}`, {
    method: 'PUT',
    body: formData,
  });

  if (res.ok) {
    const productImage = await res.json();
    dispatch(editProductImage(productImage));
    return productImage;
  }
};

export const removeProductImage = (productImageId) => async (dispatch) => {
  const res = await fetch(`/api/product-images/${productImageId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(deleteProductImage(productImageId));
  }
};

export const selectProductImagesObj = (state) => state.product_images;

export const selectProductImages = createSelector([selectProductImagesObj], (selectProductImagesObj) => ({
  ...selectProductImagesObj,
}));

export const selectImagesByProductId = (productId) =>
  createSelector([selectProductImagesObj], (images) =>
    Object.values(images).filter((image) => image.product_id === productId)
  );

const initialState = { product_images: {}, allIds: [] };

const productImagesReducer = (state = structuredClone(initialState), action) => {
  switch (action.type) {
    case SET_PRODUCT_IMAGES: {
      const newState = structuredClone(state);
      action.productImages.productImages.forEach((productImage) => {
        newState.product_images[productImage.id] = productImage;
        if (!newState.allIds.includes(productImage.id)) {
          newState.allIds.push(productImage.id);
        }
      });
      return newState;
    }
    case ADD_PRODUCT_IMAGE: {
      const newState = structuredClone(state);
      newState.product_images[action.product_image.id] = action.product_image;
      if (!newState.allIds.indexOf(action.product_image.id) < 0) {
        newState.allIds.push(action.product_image.id);
      }
      return newState;
    }
    case EDIT_PRODUCT_IMAGE: {
      const newState = { ...state };
      newState.product_images[action.productImage.id] = action.productImage;
      return newState;
    }
    case DELETE_PRODUCT_IMAGE: {
      const newState = { ...state };
      delete newState.product_images[action.productImageId];
      newState.allIds = newState.allIds.filter((id) => id !== action.productImageId);
      return newState;
    }

    default:
      return state;
  }
};

export default productImagesReducer;
