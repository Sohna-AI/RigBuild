import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import ProductsPage from '../components/ProductsPage/ProductsPage';
import LandingPage from '../components/LandingPage/LandingPage';
import ProductDetails from '../components/ProductDetailsPage/ProductDetails.jsx';
import NewProductForm from '../components/NewProductForm/NewProductForm.jsx';
import UserProducts from '../components/UserProducts/UserProducts.jsx';
import UserWishlist from '../components/UserWishlist/UserWishlist.jsx';

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
              {
                path: 'edit',
                element: <NewProductForm edit={true} />,
              },
            ],
          },
          {
            path: 'new',
            element: <NewProductForm edit={false} />,
          },
          {
            path: 'current',
            element: <UserProducts />,
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: 'current',
            children: [
              {
                path: 'wishlist',
                element: <UserWishlist />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
