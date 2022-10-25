import React, { useEffect } from 'react';
import './Images.css';
import VisitorLayout from '../Layouts/VisitorLayout';
import ShowImage from '../Components/ShowImage';
import useCallAPI from '../CustomHooks/useCallAPI';
import {BASE_URL, IMAGES_INDEX_ENDPOINT_PUBLIC_IMAGES_ONLY} from '../settings';

export default function Images() {
  const {data, clearData, setFetchParameters} = useCallAPI();
  const [displayedImage, setDisplayedImage] = React.useState(null);
  const [searchInfoText, setSearchInfoText] = React.useState('');

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
    // display the fullsized image
    data.forEach(image => {
      if (image.id === parseInt(event.target.id)) {
        setDisplayedImage(image);
      }
    });
  }

  function closeDisplayedImage() {
    setDisplayedImage(null);
  }

  function setPreviousImage() {
    // set the displayed image to the previous
    // image in the data array
    let previousImage;
    const currentImageIndex = data.indexOf(displayedImage);

    // when the first image is reached, loop
    // to the last image
    if (currentImageIndex === 0) {
      previousImage = data[data.length - 1];
    }
    else {
      previousImage = data[currentImageIndex - 1];
    }
  
    setDisplayedImage(previousImage);
  }

  function setNextImage() {
    // set the displayed image to the next
    // image in the data array
    let nextImage;
    const currentImageIndex = data.indexOf(displayedImage);

    // when the last image is reached, loop
    // to the first image
    if (currentImageIndex === (data.length - 1)) {
      nextImage = data[0];
    }
    else {
      nextImage = data[currentImageIndex + 1];
    }
    
    setDisplayedImage(nextImage);
  }

  useEffect(() => {
    // on initial page load, fetch index of photos
    setFetchParameters({
      url: `${BASE_URL}${IMAGES_INDEX_ENDPOINT_PUBLIC_IMAGES_ONLY}`,
      method: 'GET',
      bodies: [],
    });
  }, [setFetchParameters]);

  return (
    <VisitorLayout
      clearData={clearData}
      setFetchParameters={setFetchParameters}
      setSearchInfoText={setSearchInfoText}
    >
      {displayedImage && 
        <ShowImage
          image={displayedImage}
          close={closeDisplayedImage}
          setPreviousImage={setPreviousImage}
          setNextImage={setNextImage}
        />
      }
      {searchInfoText &&
        <p className="images__searchInfo">
          Displaying images with tags: {searchInfoText}
        </p>
      }
      <main className="images">
        {images}
      </main>
    </VisitorLayout>
  );
}