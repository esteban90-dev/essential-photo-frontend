import React, { useEffect } from 'react';
import leftArrowIcon from '../images/left-arrow-icon.svg';
import rightArrowIcon from '../images/right-arrow-icon.svg';
import {MODAL_ADVANCE_OVERLAY_WIDTH} from '../settings';

export default function ImageModal(props) {
  const [leftOverlayIsHovered, setLeftOverlayIsHovered] = React.useState(false);
  const [rightOverlayIsHovered, setRightOverlayIsHovered] = React.useState(false);

  const modalRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const leftOverlayRef = React.useRef(null);
  const rightOverlayRef = React.useRef(null);

  function handleClick(event) {
    // when the modal area outside of the image
    // is clicked, close the modal
    if (event.target === modalRef.current) {
      props.closeModal();
    }
  }

  useEffect(() => {
    // When the modal first loads, the image will be resized to 
    // fit the screen and the advancer overlays will be placed 
    // on either side of the image.
    //
    // Additionally, event listeners are attached to the window 
    // object to resize the image and re-place the overlays
    // whenever the window is resized.
    //
    // Additionally, event listeners are attached to the window
    // object to close the modal whenever the escape key is pressed
    // and load the next/previous image whenever the left/right 
    // arrow keys are pressed
    //

    const imageElement = imageRef.current;
    const leftOverlayElement = leftOverlayRef.current;
    const rightOverlayElement = rightOverlayRef.current;

    function resizeImage() {
      const imageAspectRatio = imageRef.current.naturalWidth / imageRef.current.naturalHeight;
      let windowAspectRatio = window.innerWidth / window.innerHeight;
      
      if (windowAspectRatio > imageAspectRatio) {
        imageRef.current.style.height = '90vh';
        imageRef.current.style.width = `${imageRef.current.getBoundingClientRect().height * imageAspectRatio}px`;
      }
      else {
        imageRef.current.style.width = '90vw';
        imageRef.current.style.height = `${imageRef.current.getBoundingClientRect().width / imageAspectRatio}px`;
      }
    }

    function placeOverlays() {
      const {
        height: imageHeight,
        width: imageWidth,
        top: imageTop,
        left: imageLeft,
        right: imageRight,
      } = imageElement.getBoundingClientRect();

      leftOverlayElement.style.height = `${imageHeight}px`;
      leftOverlayElement.style.width = `${imageWidth * MODAL_ADVANCE_OVERLAY_WIDTH}px`;
      leftOverlayElement.style.top = `${imageTop}px`;
      leftOverlayElement.style.left = `${imageLeft}px`;

      rightOverlayElement.style.height = `${imageHeight}px`;
      rightOverlayElement.style.width = `${imageWidth * MODAL_ADVANCE_OVERLAY_WIDTH}px`;
      rightOverlayElement.style.top = `${imageTop}px`;
      rightOverlayElement.style.left = 
        `${imageRight - rightOverlayElement.getBoundingClientRect().width}px`;
    }

    function handleKeyDown(event) {
      // if escape key was pressed
      if (event.which === 27) {
        props.closeModal();
      }

      // if right arrow key was pressed
      else if (event.which === 39) {
        props.setNextImage();
      }

      // if left arrow key was pressed
      else if (event.which === 37) {
        props.setPreviousImage();
      }
    }

    imageElement.addEventListener('load', resizeImage);
    imageElement.addEventListener('load', placeOverlays)
    window.addEventListener('resize', resizeImage);
    window.addEventListener('resize', placeOverlays);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', resizeImage);
      window.removeEventListener('resize', placeOverlays);
      window.removeEventListener('keydown', handleKeyDown);
      imageElement.removeEventListener('load', resizeImage);
      imageElement.removeEventListener('load', placeOverlays);
    };
  }, [props]);

  return (
    <div className="imageModal" onClick={handleClick} ref={modalRef}>
      <img
        src={props.url}
        ref={imageRef}
        className="imageModal__image"
        alt=""
      ></img>
      <div
        className={leftOverlayIsHovered ? 
          `imageModal__overlay imageModal__overlay--hovered`
          :
          `imageModal__overlay`
        }
        onMouseEnter={() => setLeftOverlayIsHovered(true)}
        onMouseLeave={() => setLeftOverlayIsHovered(false)}
        ref={leftOverlayRef}
        onClick={() => props.setPreviousImage()}
      >
        {leftOverlayIsHovered && 
          <img
            src={leftArrowIcon}
            alt="this is an arrow icon"
            className="imageModal__icon"
          ></img>
        }
      </div>
      <div
        className={rightOverlayIsHovered ? 
          `imageModal__overlay imageModal__overlay--hovered`
          :
          `imageModal__overlay`
        }
        onMouseEnter={() => setRightOverlayIsHovered(true)}
        onMouseLeave={() => setRightOverlayIsHovered(false)}
        ref={rightOverlayRef}
        onClick={() => props.setNextImage()}
      >
        {rightOverlayIsHovered && 
          <img
            src={rightArrowIcon}
            alt="this is an arrow icon"
            className="imageModal__icon"
          ></img>
        }
      </div>
    </div>
  )
}