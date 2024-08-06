import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ProductsPage from '../components/ProductsPage/ProductsPage';
import LandingPage from '../components/LandingPage/LandingPage';
import ProductDetails from '../components/ProductDetailsPage/ProductDetails.jsx';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: 'products',
        children: [
          {
            index: true,
            element: <ProductsPage />,
          },
          {
            path: ':productId',
            children: [
              {
                path: '',
                element: <ProductDetails />,
              },
            ],
          },
        ],
      },
      {
        path: 'login',
        element: <LoginFormPage />,
      },
      {
        path: 'signup',
        element: <SignupFormPage />,
      },
    ],
  },
]);
