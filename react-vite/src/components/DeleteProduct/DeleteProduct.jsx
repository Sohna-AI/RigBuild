import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as productActions from '../../redux/products';
import { useNavigate } from 'react-router-dom';
import './DeleteProduct.css';

const DeleteProduct = ({ productId, current = false }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const confirmDelete = () => {
    const deleteProduct = async () => {
      await dispatch(productActions.deleteProductById(productId, (current = true)));
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
            <span className="delete-product-button__text">Delete</span>
            <span className="delete-product-button__icon">
              <svg
                className="svg"
                height="512"
                viewBox="0 0 512 512"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title></title>
                <path
                  d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
                  style={{
                    fill: 'none',
                    stroke: '#fff',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: '32px',
                  }}
                ></path>
                <line
                  style={{
                    stroke: '#fff',
                    strokeLinecap: 'round',
                    strokeMiterlimit: 10,
                    strokeWidth: '32px',
                  }}
                  x1="80"
                  x2="432"
                  y1="112"
                  y2="112"
                ></line>
                <path
                  d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
                  style={{
                    fill: 'none',
                    stroke: '#fff',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: '32px',
                  }}
                ></path>
                <line
                  style={{
                    fill: 'none',
                    stroke: '#fff',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: '32px',
                  }}
                  x1="256"
                  x2="256"
                  y1="176"
                  y2="400"
                ></line>
                <line
                  style={{
                    fill: 'none',
                    stroke: '#fff',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: '32px',
                  }}
                  x1="184"
                  x2="192"
                  y1="176"
                  y2="400"
                ></line>
                <line
                  style={{
                    fill: 'none',
                    stroke: '#fff',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: '32px',
                  }}
                  x1="328"
                  x2="320"
                  y1="176"
                  y2="400"
                ></line>
              </svg>
            </span>
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
