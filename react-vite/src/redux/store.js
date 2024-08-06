import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import productsReducer from './products';
import categoriesReducer from './categories';
import userReducer from './users';
import wishlistReducer from './wishlist';
import reviewsReducer from './reviews';

const rootReducer = combineReducers({
  session: sessionReducer,
  products: productsReducer,
  reviews: reviewsReducer,
  wishlist: wishlistReducer,
  categories: categoriesReducer,
  users: userReducer,
});

let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import('redux-logger')).default;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
