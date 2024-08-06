import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import configureStore from './redux/store';
import { router } from './router';
import * as sessionActions from './redux/session';
import * as productActions from './redux/products';
import * as categoryActions from './redux/categories';
import * as wishlistAcion from './redux/wishlist';
import * as userActions from './redux/users';
import * as reviewActions from './redux/reviews';
import './index.css';

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  window.store = store;
  window.sessionActions = sessionActions;
  window.productActions = productActions;
  window.categoryActions = categoryActions;
  window.wishlistAcion = wishlistAcion;
  window.reviewActions = reviewActions;
  window.userActions = userActions;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);
