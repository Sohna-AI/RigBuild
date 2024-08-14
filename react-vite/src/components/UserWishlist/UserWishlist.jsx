import { useSelector } from 'react-redux';
import { selectWishlistProducts } from '../../redux/wishlist';
import ProductCard from '../ProductsPage/ProductCard';
const UserWishlist = () => {
  const wishlist = useSelector(selectWishlistProducts);
  const sessionUser = useSelector((state) => state.session.user);

  const avgRating = (reviews) => {
    let ratings = 0;
    reviews.map((review) => {
      ratings += review.rating;
    });
    return (ratings / reviews.length).toFixed(2);
  };

  const handleWishlistHeader = (numWishlist) => {
    if (numWishlist === 0) return 'No products in your wishlist';
    if (numWishlist === 1) return `${numWishlist} product`;
    if (numWishlist > 1) return `${numWishlist} products`;
  };
  return (
    <>
      <div className="users-wishlist-page-container">
        <div>
          <h1>{sessionUser.username}&apos;s Wishlist</h1>
          <h3>{handleWishlistHeader(wishlist.allIds.length)} </h3>
        </div>
        <div>
          {wishlist?.allIds.map((id) => {
            const product = wishlist.products[id];
            return (
              <div className="single-product" key={id}>
                <ProductCard
                  id={product?.id}
                  name={product.name}
                  price={product.price}
                  rating={avgRating(product.reviews)}
                  stock_quantity={product.stock_quantity}
                  product_image={product.product_images[0]?.image_url}
                  showWishlistButton={true}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UserWishlist;
