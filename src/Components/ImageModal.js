import React from 'react';
import ModalAdvancer from './ModalAdvancer';
import leftArrowIcon from '../images/left-arrow-icon.svg';
import rightArrowIcon from '../images/right-arrow-icon.svg';

export default function ImageModal(props) {
  const modalRef = React.useRef(null);

  function handleClick(event) {
    // when the modal area outside of the image
    // is clicked, close the modal
    if (event.target === modalRef.current) {
      props.closeModal();
    }
  }

  return (
    <div className="imageModal" onClick={handleClick} ref={modalRef}>
      <div className="imageModal__imageContainer">
        <ModalAdvancer
          icon={leftArrowIcon}
          position="left"
          setNextImage={props.setPreviousImage}
        />
        <img
          src={props.url}
          className="imageModal__image"
          alt=""
        ></img>
        <ModalAdvancer
          icon={rightArrowIcon}
          position="right"
          setNextImage={props.setNextImage}
        />
      </div>
    </div>
  )
}