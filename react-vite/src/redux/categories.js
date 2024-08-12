import { createSelector } from '@reduxjs/toolkit';

const SET_CATEGORIES = 'category/setCategories';
const SET_PRODUCTS_BY_CATEGORY = 'category/setProductsByCategory';

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  categories,
});

export const setProductsByCategory = (categoryId, products) => ({
  type: SET_PRODUCTS_BY_CATEGORY,
  categoryId,
  products,
});

export const getCategories = () => async (dispatch) => {
  const res = await fetch('/api/categories/');

  if (res.ok) {
    const list = await res.json();
    dispatch(setCategories(list));
    return list;
  }
};

export const getProductsByCategory = (categoryId) => async (dispatch) => {
  const res = await fetch(`/api/category/${categoryId}`);
  if (res.ok) {
    const products = await res.json();
    dispatch(setProductsByCategory(categoryId, products));
    return products;
  }
};

const selectCategoriesObj = (state) => state.categories;

export const selectCategories = createSelector([selectCategoriesObj], (categoriesState) =>
  categoriesState.allIds.map((id) => categoriesState.categories[id])
);

export const selectProductsByCategory = createSelector(
  [selectCategoriesObj, (state, categoryId) => categoryId],
  (categoriesState, categoryId) => categoriesState.categories[categoryId]?.products || []
);

const initialState = { categories: {}, allIds: [] };

const categoriesReducer = (state = structuredClone(initialState), action) => {
  switch (action.type) {
    case SET_CATEGORIES: {
      const newState = structuredClone(state);
      action.categories.categories.forEach((category) => {
        newState.categories[category.id] = structuredClone(category);
        if (newState.allIds.indexOf(category.id) < 0) newState.allIds.push(category.id);
      });
      return newState;
    }
    case SET_PRODUCTS_BY_CATEGORY: {
      const newState = structuredClone(state);
      if (newState.categories[action.categoryId]) {
        newState.categories[action.categoryId].products = action.products;
      }
      return newState;
    }
    default:
      return state;
  }
};

export default categoriesReducer;
