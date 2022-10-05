import React from 'react';
import './ModalLayout.css';

export default function ModalLayout(props) {
  const modalRef = React.useRef(null);

  function handleClick(event) {
    if (event.target === modalRef.current) {
      props.close();
    }
  }

  function getClassName() {
    if (props.dark) {
      return 'modalLayout modalLayout--dark'
    }
    return 'modalLayout modalLayout--light'
  }

  return (
    <div className={getClassName()} ref={modalRef} onClick={handleClick}>
      {props.children}
    </div>
  );
}