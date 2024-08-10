import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as productActions from '../../redux/products';
import * as categoryActions from '../../redux/categories';
import * as productImageActions from '../../redux/productImages';
import './NewProductForm.css';

export default function NewProductForm({ edit }) {
  const { productId } = useParams();
  const products = useSelector(productActions.selectProducts);
  const categories = useSelector(categoryActions.selectCategories);
  const productImages = useSelector(productImageActions.selectProductImages);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [currentImageId, setCurrentImageId] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [deleteCurrentImage, setDeleteCurrentImage] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = products.products[productId];

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('productFormData'));
    if (savedFormData) {
      setName(savedFormData.name || '');
      setDescription(savedFormData.description || '');
      setPrice(savedFormData.price || 0);
      setQuantity(savedFormData.quantity || 0);
      setCategory(savedFormData.category || '');
      setImage(savedFormData.image || null);
    }
  }, []);

  const saveFormData = (updatedData) => {
    const currentData = {
      name,
      description,
      price,
      quantity,
      category,
      image,
      ...updatedData,
    };
    localStorage.setItem('productFormData', JSON.stringify(currentData));
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoaded(false);
      try {
        await dispatch(categoryActions.getCategories());
        await dispatch(productImageActions.getProductImages());
        if (edit) {
          await dispatch(productActions.getProductDetailsById(productId));
        }
      } catch (error) {
        setErrors(error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchInitialData();
  }, [dispatch, edit, productId]);

  useEffect(() => {
    if (edit && product && categories.length > 0) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setQuantity(product.stock_quantity);
      setCategory(categories.find((cat) => cat.id === product.category_id)?.name || '');
      const productImage = Object.values(productImages.product_images).find(
        (img) => img.product_id === parseInt(productId)
      );
      if (productImage) {
        setCurrentImageId(productImage.id);
        setCurrentImageUrl(productImage.image_url);
      }
    }
  }, [edit, product, categories, productImages, productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const selectedCategory = categories.find((cat) => cat.name === category);

    const formData = {
      name,
      description,
      price: parseFloat(price),
      stock_quantity: parseInt(quantity),
      category_id: selectedCategory ? selectedCategory.id : null,
    };

    try {
      if (edit) {
        await dispatch(productActions.editProductById(productId, formData));
        if (deleteCurrentImage && currentImageId) {
          await dispatch(productImageActions.removeProductImage(currentImageId));
        }
        if (image) {
          await dispatch(productImageActions.addNewProductImage(productId, image));
        }
        localStorage.removeItem('productFormData');
        navigate(`/products/${productId}`);
      } else {
        const newProduct = await dispatch(productActions.addNewProduct(formData, image));

        await dispatch(productImageActions.addNewProductImage(newProduct.id, image));

        localStorage.removeItem('productFormData');
        navigate(`/products/${newProduct.id}`);
      }
    } catch (error) {
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setDeleteCurrentImage(true);
  };

  const handleDeleteImage = async () => {
    setDeleteCurrentImage(true);
    setCurrentImageUrl(null);
    setImage(null);
  };

  const handleCancel = () => {
    localStorage.removeItem('productFormData');
    if (edit) navigate(`/products/${productId}`);
    else navigate('/products');
  };

  return (
    <>
      {loading && <div className="loading-spinner">Loading...</div>}
      {isLoaded && (
        <>
          <div className="new-product-form-container">
            <div className="product-form-header">
              {edit ? <h1>Update Product</h1> : <h1>Sell Product</h1>}
            </div>
            <p className="form-instructions">
              {edit
                ? 'Update the details of your product below. Make sure to fill out all required fields.'
                : 'Fill out the form below to list your product for sale. Make sure to fill out all required fields.'}
            </p>
            <form className="product-form-container" encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="product-form-name" id="input-group-container">
                <label>Name of product</label>
                <input
                  className="product-form-input"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    saveFormData({ name: e.target.value });
                  }}
                  required
                />
                {errors.name && <p>{errors.name}</p>}
              </div>
              <div className="product-form-describe" id="input-group-container">
                <label>Describe the product</label>
                <textarea
                  className="product-form-input"
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    saveFormData({ description: e.target.value });
                  }}
                  required
                />
                {errors.description && <p>{errors.description}</p>}
              </div>
              <div className="product-form-price" id="input-group-container">
                <label>Price of your product</label>
                <input
                  className="product-form-input"
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    saveFormData({ price: e.target.value });
                  }}
                  required
                  min="0"
                  inputMode="numeric"
                  onWheel={(e) => e.target.blur()}
                />
                {errors.price && <p>{errors.price}</p>}
              </div>
              <div className="product-form-quantity" id="input-group-container">
                <label>What is quantity of your stock?</label>
                <input
                  className="product-form-input"
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    saveFormData({ quantity: e.target.value });
                  }}
                  required
                  min="0"
                  inputMode="numeric"
                  onWheel={(e) => e.target.blur()}
                />
                {errors.quantity && <p>{errors.quantity}</p>}
              </div>
              <div className="product-form-category" id="input-group-container">
                <label>Select category</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    saveFormData({ category: e.target.value });
                  }}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option value={cat.name} key={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && <p>{errors.category}</p>}
              </div>
              <div className="product-form-image" id="input-group-container">
                <label>Upload an image</label>
                {currentImageUrl && !loading ? (
                  <div>
                    <img
                      src={currentImageUrl}
                      alt="Current product"
                      style={{ width: '100px', height: '100px' }}
                    />
                    <button type="button" onClick={handleDeleteImage}>
                      Delete Image
                    </button>
                  </div>
                ) : (
                  <input type="file" accept="image/*" onChange={handleImageChange} required />
                )}
                {errors.image && <p>{errors.image}</p>}
              </div>
              <div className="product-form-submit-cancel">
                <div className="product-form-submit-button-container">
                  <button type="submit" className="product-form-submit-button">
                    {edit ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
                <div className="product-form-cancel-button-container">
                  <button onClick={handleCancel} className="product-form-cancel-button">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
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
            <img src="../../../public/short-logo-light-mode.png" className="product-page-logo-image" />
          </NavLink>
        </div>
      </footer>
    </>
  );
}
