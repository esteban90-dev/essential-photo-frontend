import React from 'react';
import './ModalLayout.css';

export default function ModalLayout(props) {
  const modalRef = React.useRef(null);

  function handleClick(event) {
    if (event.target === modalRef.current) {
      props.close();
    }
  }

  return (
    <div className="modalLayout" ref={modalRef} onClick={handleClick}>
      {props.children}
    </div>
  );
}