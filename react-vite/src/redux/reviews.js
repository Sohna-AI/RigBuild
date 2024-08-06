import { createSelector } from '@reduxjs/toolkit';

// const LOAD_REVIEWS = 'reviews/loadReviews';
// const ADD_REVIEW = 'reviews/addReview';
// const DELETE_REVIEW = 'reviews/deleteReview';

// export const loadReviews = (reviews, productId) => ({
//   type: LOAD_REVIEWS,
//   reviews,
//   productId,
// });

// export const addReview = (reviews) => ({
//   type: ADD_REVIEW,
//   reviews,
// });

// export const deleteReview = (review) => ({
//   type: DELETE_REVIEW,
//   review,
// });

// export const loadReviewsByProductId = (productId) => async (dispatch) => {
//   const res = await fetch(`/api/products/${productId}/reviews`);
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadReviews(data, productId));
//     return data;
//   }
// };

// export const createReview = (data, productId) => async (dispatch) => {
//   const res = await fetch(`/api/products/${productId}/reviews`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   if (res.ok) {
//     const newReview = await res.json();
//     dispatch(addReview(newReview));
//     return newReview;
//   }
// };

// export const deleteReviewById = (reviewId) => async (dispatch) => {
//   const res = await fetch(`/api/reviews/${reviewId}`, {
//     method: 'DELETE',
//   });
//   if (res.ok) {
//     dispatch(deleteReview(reviewId));
//     return;
//   }
// };

// const selectReviewsObj = (state) => state.reviews;

// export const selectReviews = createSelector([selectReviewsObj], (selectReviewsObj) => ({
//   ...selectReviewsObj,
// }));

// const initialState = { reviews: {}, allIds: [] };

// function reviewsReducer(state = structuredClone(initialState), action) {
//   switch (action.type) {
//     case LOAD_REVIEWS: {
//       const newState = structuredClone(state);
//       action.reviews.reviews.forEach((review) => {
//         newState.reviews[review.id] = structuredClone(review);
//         if (newState.allIds.indexOf(review.id) < 0) {
//           newState.allIds.push(review.id);
//         }
//       });
//       return newState;
//     }
//     case ADD_REVIEW: {
//       const newState = structuredClone(state);
//       const review = action.review;
//       newState.reviews[review.id] = structuredClone(review);
//       if (newState.allIds.includes(review.id) < 0) {
//         newState.allIds.push(review.id);
//       }
//       return newState;
//     }
//     case DELETE_REVIEW: {
//       const newState = structuredClone(state);
//       delete newState.reviews[action.reviewId];
//       newState.allIds = newState.allIds.filter((id) => id !== action.reviewId);
//       return newState;
//     }
//     default:
//       return state;
//   }
// }
const LOAD_REVIEWS = 'reviews/loadReviews';
const ADD_REVIEW = 'reviews/addReview';
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
    case DELETE_REVIEW: {
      const newState = structuredClone(state);
      const { productId, reviewId } = action;
      delete newState[productId].reviews[reviewId];
      newState[productId].allIds = newState[productId].allIds.filter((id) => id !== reviewId);
      return newState;
    }
    default:
      return state;
  }
}

export default reviewsReducer;
