import { createSelector } from '@reduxjs/toolkit';

const LOAD_REVIEWS = 'reviews/loadReviews';
const ADD_REVIEW = 'reviews/addReview';
const EDIT_REVIEW = 'reviews/editReview';
const DELETE_REVIEW = 'reviews/deleteReview';

export const loadReviews = (reviews, productId) => ({
  type: LOAD_REVIEWS,
  reviews,
  productId,
});

export const addReview = (review, productId) => ({
  type: ADD_REVIEW,
  review,
  productId,
});

export const editReview = (reviewId, newData) => ({
  type: EDIT_REVIEW,
  reviewId,
  newData,
});

export const deleteReview = (reviewId, productId) => ({
  type: DELETE_REVIEW,
  reviewId,
  productId,
});

export const loadReviewsByProductId = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}/reviews`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadReviews(data, productId));
    return data;
  }
};

export const createReview = (data, productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const newReview = await res.json();
    dispatch(addReview(newReview, productId));
    return newReview;
  }
};

export const editReviewById = (data, reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const updatedReview = await res.json();
    dispatch(editReview(reviewId, updatedReview));
    return updatedReview;
  }
};

export const deleteReviewById = (reviewId, productId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    dispatch(deleteReview(reviewId, productId));
    return;
  }
};

const selectReviewsObj = (state) => state.reviews;

export const selectReviews = createSelector([selectReviewsObj], (selectReviewsObj) => ({
  ...selectReviewsObj,
}));

const initialState = {};

function reviewsReducer(state = structuredClone(initialState), action) {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const newState = structuredClone(state);
      newState[action.productId] = {
        reviews: action.reviews.reviews.reduce((acc, review) => {
          acc[review.id] = review;
          return acc;
        }, {}),
        allIds: action.reviews.reviews.map((review) => review.id),
      };
      return newState;
    }
    case ADD_REVIEW: {
      const newState = structuredClone(state);
      const { productId, review } = action;
      if (!newState[productId]) {
        newState[productId] = { reviews: {}, allIds: [] };
      }
      newState[productId].reviews[review.id] = review;
      if (!newState[productId].allIds.includes(review.id)) {
        newState[productId].allIds.push(review.id);
      }
      return newState;
    }
    case EDIT_REVIEW: {
      const newState = structuredClone(state);
      const { productId, review } = action;
      if (newState[productId] && newState[productId].reviews[review.id]) {
        newState.reviews[review.id] = review;
      }
      return newState;
    }
    case DELETE_REVIEW: {
      const newState = structuredClone(state);
      const { reviewId, productId } = action;
      delete newState[productId].reviews[reviewId];
      newState[productId].allIds = newState[productId].allIds.filter((id) => id !== reviewId);
      return newState;
    }
    default:
      return state;
  }
}

export default reviewsReducer;
