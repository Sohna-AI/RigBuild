import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  reviewDelete,
  reviewEdit,
  reviewProduct,
  productDetailsDelete,
  productDeleteOnCurrent,
  shoppingCartButton,
  
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === 'function') onButtonClick();
  };

  const handleClassName = () => {
    if (reviewDelete) return 'review-card-delete-button';
    if (reviewEdit) return 'review-card-edit-button';
    if (reviewProduct) return 'review-this-product-button';
    if (productDetailsDelete) return 'product-details-delete-button';
    if (productDeleteOnCurrent) return 'users-product-delete-button';
    if (shoppingCartButton) return 'users-shopping-cart-nav-button'
    
  };
  handleClassName();
  return (
    <button onClick={onClick} className={handleClassName()}>
      {buttonText}
    </button>
  );
}

export default OpenModalButton;
