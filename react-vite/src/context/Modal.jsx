import { useRef, useState, useContext, createContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  // callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === 'function') {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal, // function to close the modal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);
  const [isVisible, setIsVisible] = useState(false);
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:

  useEffect(() => {
    if (modalContent) setIsVisible(true);
    else setIsVisible(false);
  }, [modalContent]);
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="modal"
          className="modal"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            id="modal-background"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 100 }}
            exit={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.0 }}
            onClick={closeModal}
          />
          <div id="modal-content">{modalContent}</div>
        </motion.div>
      )}
    </AnimatePresence>,
    // <div id="modal" className={`modal ${isVisible ? 'modal-enter' : 'modal-exit'}`}>
    //   <div id="modal-background" onClick={closeModal} />
    //   <div id="modal-content">{modalContent}</div>
    // </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);
