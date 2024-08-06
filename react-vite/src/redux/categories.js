import { createSelector } from '@reduxjs/toolkit';

const SET_CATEGORIES = 'category/setCategories';

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  categories,
});

export const getCategories = () => async (dispatch) => {
  const res = await fetch('/api/categories/');

  if (res.ok) {
    const list = await res.json();
    dispatch(setCategories(list));
    return list;
  }
};

const selectCategoriesObj = (state) => state.categories;

export const selectCategories = createSelector([selectCategoriesObj], (categoriesState) =>
  categoriesState.allIds.map((id) => categoriesState.categories[id])
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
    default:
      return state;
  }
};

export default categoriesReducer;
