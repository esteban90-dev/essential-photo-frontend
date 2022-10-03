import React from 'react';
import './ModalLayout.css';

export default function ModalLayout(props) {
  return (
    <div className="modalLayout">
      {props.children}
    </div>
  );
}