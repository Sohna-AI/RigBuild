import { useModal } from '../../context/Modal';

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the button that opens the modal
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  profileDropdownLogin,
  profileDropdownSignup,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === 'function') onItemClick();
  };

  const chooseClassName = () => {
    if (profileDropdownLogin) return 'profile-dropdown-login-container';
    if (profileDropdownSignup) return 'profile-dropdown-signup-container';
  };

  return (
    <li onClick={onClick} className={chooseClassName()}>
      {itemText}
    </li>
  );
}

export default OpenModalMenuItem;
