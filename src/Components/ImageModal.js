import React, { useEffect } from 'react';
import leftArrowIcon from '../images/left-arrow-icon.svg';
import rightArrowIcon from '../images/right-arrow-icon.svg';
import fullScreenIcon from '../images/fullscreen-icon.svg';
import {MODAL_ADVANCE_OVERLAY_WIDTH, SWIPE_DISTANCE_THRESHOLD} from '../settings';

export default function ImageModal(props) {
  const [leftOverlayIsHovered, setLeftOverlayIsHovered] = React.useState(false);
  const [rightOverlayIsHovered, setRightOverlayIsHovered] = React.useState(false);
  const [bottomOverlayIsHovered, setBottomOverlayIsHovered] = React.useState(false);

  const modalRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const leftOverlayRef = React.useRef(null);
  const rightOverlayRef = React.useRef(null);
  const bottomOverlayRef = React.useRef(null);

  let originalTouchPosition = null;
  let lastTouchPosition = null;

  function handleClick(event) {
    // when the modal area outside of the image
    // is clicked, close the modal
    if (event.target === modalRef.current) {
      props.closeModal();
    }
  }

  function handleTouchStart(event) {
    // when the image is initially touched, record the 
    // original X coordinate position
    originalTouchPosition = event.touches[0].clientX;
    lastTouchPosition = event.touches[0].clientX;
  }

  function handleTouchMove(event) {
    // after the image is initially touched and the touch starts to 
    // move (swipe) across the screen, modify the styles on the image
    // to allow the image to track the touch position in the x direction
    const positionChange = event.touches[0].clientX - lastTouchPosition;
    const imageLeft = imageRef.current.getBoundingClientRect().left;

    lastTouchPosition = event.touches[0].clientX;
    
    imageRef.current.style.position = 'fixed';
    imageRef.current.style.left = `${imageLeft + positionChange}px`;
  }

  function handleTouchEnd(event) {
    // when the swipe is released, if the final position is more
    // than some distance from the original position, then load the next image
    // if the the image didn't move enough when the swipe ended, 
    // return it to it's original position before the swipe began
    const swipeDistance = Math.abs(lastTouchPosition - originalTouchPosition);
    const positiveSwipeDirection = (lastTouchPosition - originalTouchPosition) > 0 ? true : false;

    if (swipeDistance > SWIPE_DISTANCE_THRESHOLD) {
      if (positiveSwipeDirection) {
        props.setPreviousImage();
      }
      else {
        props.setNextImage();
      }
      imageRef.current.removeAttribute('style');
    }
    
    imageRef.current.style.position = 'static';
    imageRef.current.style.left = null;
  }

  useEffect(() => {
    // When the modal first loads, the image will be resized to 
    // fit the screen and the overlays will be placed 
    // on the left, right, and bottom of the image.
    //
    // Additionally, event listeners are attached to the window 
    // object to resize the image and re-place the overlays
    // whenever the window is resized.
    //
    // Additionally, event listeners are attached to the window
    // object to close the modal whenever the escape key is pressed
    // and load the next/previous image whenever the left/right 
    // arrow keys are pressed

    const imageElement = imageRef.current;
    const leftOverlayElement = leftOverlayRef.current;
    const rightOverlayElement = rightOverlayRef.current;
    const bottomOverlayElement = bottomOverlayRef.current;

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
        bottom: imageBottom,
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

      // make bottom overlay as high as the left/right overlays are wide
      bottomOverlayElement.style.height = `${imageHeight * MODAL_ADVANCE_OVERLAY_WIDTH}px`; 
      bottomOverlayElement.style.width = `${imageWidth}px`;
      bottomOverlayElement.style.top = 
        `${imageBottom - bottomOverlayElement.getBoundingClientRect().height}px`;
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      ></img>
      <div
        className={leftOverlayIsHovered ? 
          `imageModal__leftRightOverlay imageModal__leftRightOverlay--hovered`
          :
          `imageModal__leftRightOverlay`
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
            className="imageModal__arrowIcon"
          ></img>
        }
      </div>
      <div
        className={rightOverlayIsHovered ? 
          `imageModal__leftRightOverlay imageModal__leftRightOverlay--hovered`
          :
          `imageModal__leftRightOverlay`
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
            className="imageModal__arrowIcon"
          ></img>
        }
      </div>
      <div
        className={bottomOverlayIsHovered ? 
          `imageModal__bottomOverlay imageModal__bottomOverlay--hovered`
          :
          `imageModal__bottomOverlay`
        }
        onMouseEnter={() => setBottomOverlayIsHovered(true)}
        onMouseLeave={() => setBottomOverlayIsHovered(false)}
        ref={bottomOverlayRef}
      >
        {bottomOverlayIsHovered && 
          <a
            href={props.url}
            className="imageModal__fullScreenIconAnchor"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={fullScreenIcon}
              alt="this is a fullscreen icon"
              className="imageModal__fullScreenIcon"
            ></img>
          </a> 
        }
      </div>
    </div>
  )
}