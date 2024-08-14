import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as productActions from '../../redux/products';
import { useNavigate } from 'react-router-dom';

const DeleteProduct = ({ productId, current = false }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const confirmDelete = () => {
    const deleteProduct = async () => {
      await dispatch(productActions.deleteProductById(productId, current));
      navigate('/products/current');
      closeModal();
    };

    deleteProduct();
  };
  return (
    <>
      <div className="delete-product-container">
        <div className="delete-product-title">
          <h1>Confirm Delete </h1>
          <h3>Are you sure you want to delete this listed product?</h3>
        </div>
        <div className="delete-product-delete-cancel-container">
          <button className="delete-product-button" onClick={confirmDelete}>
            Delete
          </button>
          <button className="delete-product-cancel-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteProduct;
