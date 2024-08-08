import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as productActions from '../../redux/products';
import * as categoryActions from '../../redux/categories';
import * as productImageActions from '../../redux/productImages';

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
  const [errors, setErrors] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
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
          await dispatch(productActions.getProductDetailsById(productId)); // Fetch product details
        }
      } catch (error) {
        setErrors(error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchInitialData();
  }, [dispatch, edit, productId]);

  // Populate the form when the product details are available
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

    const selectedCategory = categories.find((cat) => cat.name === category);

    const formData = {
      name,
      description,
      price,
      stock_quantity: quantity,
      category_id: selectedCategory ? selectedCategory.id : null,
    };

    try {
      if (edit) {
        await dispatch(productActions.editProductById(productId, formData));
        if (image) {
          if (currentImageId) {
            await dispatch(productImageActions.editProductImageById(currentImageId, image));
          } else {
            await dispatch(productImageActions.addNewProductImage(productId, image));
          }
        }
      } else {
        const newProduct = await dispatch(productActions.addNewProduct(formData, image));
        if (image) {
          await dispatch(productImageActions.addNewProductImage(newProduct.id, image));
        }
      }
      navigate('/');
    } catch (error) {
      setErrors(error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDeleteImage = async () => {
    if (currentImageId) {
      await dispatch(productImageActions.removeProductImage(currentImageId));
      setCurrentImageId(null);
      setCurrentImageUrl(null);
    }
  };

  return (
    <>
      {isLoaded && (
        <>
          <div className="new-product-form-container">
            <div className="product-form-header">
              {edit ? <h1>Update Product</h1> : <h1>Sell Product</h1>}
            </div>
            <form className="product-form-container">
              <div>
                <label>Name of product</label>
                <input
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
              <div>
                <label>Describe the product</label>
                <textarea
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
              <div>
                <label>Price of your product</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    saveFormData({ price: e.target.value });
                  }}
                  required
                />
                {errors.price && <p>{errors.price}</p>}
              </div>
              <div>
                <label>What is quantity of your stock?</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    saveFormData({ quantity: e.target.value });
                  }}
                  required
                />
                {errors.quantity && <p>{errors.quantity}</p>}
              </div>
              <div>
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
              <div>
                <label>Upload an image</label>
                {currentImageUrl ? (
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
              <div>
                <button type="submit">{edit ? 'Update Product' : 'Add Product'}</button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
