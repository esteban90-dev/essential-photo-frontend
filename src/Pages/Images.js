import React, { useEffect } from 'react';
import './Images.css';
import VisitorLayout from '../Layouts/VisitorLayout';
import ShowImage from '../Components/ShowImage';
import useCallAPI from '../CustomHooks/useCallAPI';
import {BASE_URL, IMAGES_INDEX_ENDPOINT} from '../settings';

export default function Images() {
  const {data, setFetchParameters} = useCallAPI();
  const [modalImageUrl, setModalImageUrl] = React.useState(null);

  const images = data.map(image => {
    return (
      <div className="images__imageContainer" key={image.id}>
        <img
          src={image.thumbnail_url}
          id={image.id}
          className="images__image"
          alt=""
          onClick={handleClick}
        ></img>
      </div>
    );
  });

  function handleClick(event) {
    // find image with matching id
    let selectedImage;

    data.forEach(image => {
      if (image.id === parseInt(event.target.id)) {
        selectedImage = image;
      }
    });
    
    // display the fullsized image modal
    setModalImageUrl(selectedImage.image_url);
  }

  function closeModal() {
    setModalImageUrl(null);
  }

  function getCurrentModalImage() {
    // return image object associated with 
    // the current modal url
    let currentImage;

    data.forEach(image => {
      if (image.image_url === modalImageUrl) {
        currentImage = image;
      }
    });

    return currentImage;
  }

  function setPreviousImage() {
    // set the modal image to the previous
    // image in the data array
    let previousImage;
    const currentImageIndex = data.indexOf(getCurrentModalImage());

    // when the first image is reached, loop
    // to the last image
    if (currentImageIndex === 0) {
      previousImage = data[data.length - 1];
    }
    else {
      previousImage = data[currentImageIndex - 1];
    }
  
    setModalImageUrl(previousImage.image_url);
  }

  function setNextImage() {
    // set the modal image to the next
    // image in the data array
    let nextImage;
    const currentImageIndex = data.indexOf(getCurrentModalImage());

    // when the last image is reached, loop
    // to the first image
    if (currentImageIndex === (data.length - 1)) {
      nextImage = data[0];
    }
    else {
      nextImage = data[currentImageIndex + 1];
    }
    
    setModalImageUrl(nextImage.image_url);
  }

  useEffect(() => {
    // on initial page load, fetch index of photos
    setFetchParameters({
      url: `${BASE_URL}${IMAGES_INDEX_ENDPOINT}`,
      method: 'GET',
      bodies: [],
    });
  }, [setFetchParameters]);

  return (
    <VisitorLayout>
      {modalImageUrl && 
        <ShowImage
          url={modalImageUrl}
          close={closeModal}
          setPreviousImage={setPreviousImage}
          setNextImage={setNextImage}
        />
      }
      <main className="images">
        {images}
      </main>
    </VisitorLayout>
  );
}