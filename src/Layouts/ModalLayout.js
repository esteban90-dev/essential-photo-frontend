import React from 'react';
import './ModalLayout.css';

export default function ModalLayout(props) {
  const modalRef = React.useRef(null);
  const [isMouseDownOnModal, setIsMouseDownOnModal] = React.useState(false);

  function handleMouseDown(event) {
    if (event.target === modalRef.current) {
      setIsMouseDownOnModal(true);
    }
  }

  function handleMouseUp(event) {
    // Only close the modal if the mouse down/up events both originated on the 
    // modal.  Do this to prevent the user from inadvertently closing the modal
    // when the they mouse down on a different component but 
    // mouse up on the modal  
    if ((event.target === modalRef.current) && isMouseDownOnModal) {
      props.close();
    }
    setIsMouseDownOnModal(false);
  }

  function getClassName() {
    if (props.dark) {
      return 'modalLayout modalLayout--dark'
    }
    return 'modalLayout modalLayout--light'
  }

  return (
    <div
      className={getClassName()}
      ref={modalRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {props.children}
    </div>
  );
}