import { useEffect, useState } from 'react';
import { getProducts } from '../../redux/products';
import { useDispatch, useSelector } from 'react-redux';
import * as productActions from '../../redux/products';
import { NavLink } from 'react-router-dom';
import ProductCard from './ProductCard';
import './ProductsPage.css';
import { getCategories } from '../../redux/categories';
import CategorySelector from './CategorySelector';

export default function ProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector(productActions.selectProducts);
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    setIsLoaded(true);
  }, [dispatch, setIsLoaded]);

  const avgRating = (reviews) => {
    let ratings = 0;
    reviews.map((review) => {
      ratings += review.rating;
    });
    return (ratings / reviews.length).toFixed(2);
  };

  const filteredProducts = products.allIds.filter((id) => {
    const product = products.products[id];

    if (!product) return false;

    if (sessionUser && product.seller_id === sessionUser.id) {
      return false;
    }

    return selectedCategory === 'all' || product.category_id === parseInt(selectedCategory);
  });

  const savedTheme = localStorage.getItem('theme') || 'light';

  return (
    <>
      {savedTheme === 'light' ? (
        <div className="products-page-container">
          <div className="products-page-categories-container">
            <h3>{filteredProducts?.length} Products</h3>
            <div className="category-selector">
              <CategorySelector onChange={(e) => setSelectedCategory(e.target.value)} />
            </div>
          </div>
          <div className="products-list-container">
            {isLoaded &&
              filteredProducts?.map((productId) => {
                const product = products.products[productId];
                if (!product) return null;

                return (
                  <div className="single-product" key={productId}>
                    <ProductCard
                      id={productId}
                      name={product.name}
                      price={product.price}
                      rating={avgRating(product.reviews)}
                      stock_quantity={product.stock_quantity}
                      product_image={product.product_images[0]?.image_url}
                    />
                  </div>
                );
              })}
          </div>
          <footer>
            <div className="social-links">
              <div>
                <NavLink to="https://github.com/Sohna-AI" className="github-button-container">
                  <button className="github-button">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z"
                        fill="white"
                      ></path>
                    </svg>
                    <p className="github-text">Pushpinder Singh</p>
                  </button>
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="https://www.linkedin.com/in/pushpinder-s-03219b125/"
                  className="linkedin-button-container"
                >
                  <button className="linked-in-button">
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fill="#ffffff"
                          d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"
                        ></path>
                      </g>
                    </svg>
                    <p className="linked-in-text">Pushpinder Singh</p>
                  </button>
                </NavLink>
              </div>
            </div>
            <div>
              <NavLink to="/">
                <img src="/short-logo-light-mode.png" className="product-page-logo-image" />
              </NavLink>
            </div>
          </footer>
        </div>
      ) : (
        <div className="products-page-container-dark">
          <div className="products-page-categories-container-dark">
            <h3>{filteredProducts?.length} Products</h3>
            <div className="category-selector-dark">
              <CategorySelector onChange={(e) => setSelectedCategory(e.target.value)} />
            </div>
          </div>
          <div className="products-list-container-dark">
            {isLoaded &&
              filteredProducts?.map((productId) => {
                const product = products.products[productId];
                if (!product) return null;

                return (
                  <div className="single-product-dark" key={productId}>
                    <ProductCard
                      id={productId}
                      name={product.name}
                      price={product.price}
                      rating={avgRating(product.reviews)}
                      stock_quantity={product.stock_quantity}
                      product_image={product.product_images[0]?.image_url}
                    />
                  </div>
                );
              })}
          </div>
          <footer>
            <div className="social-links-dark">
              <div>
                <NavLink to="https://github.com/Sohna-AI" className="github-button-container-dark">
                  <button className="github-button-dark">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z"
                        fill="white"
                      ></path>
                    </svg>
                    <p className="github-text-dark">Pushpinder Singh</p>
                  </button>
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="https://www.linkedin.com/in/pushpinder-s-03219b125/"
                  className="linkedin-button-container-dark"
                >
                  <button className="linked-in-button-dark">
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fill="#ffffff"
                          d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"
                        ></path>
                      </g>
                    </svg>
                    <p className="linked-in-text-dark">Pushpinder Singh</p>
                  </button>
                </NavLink>
              </div>
            </div>
            <div>
              <NavLink to="/">
                <img src="/short-logo-dark-mode.svg" className="product-page-logo-image-dark" />
              </NavLink>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
