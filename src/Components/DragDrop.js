import React from 'react';
import {BASE_URL, POST_IMAGES_ENDPOINT} from '../settings';

export default function DragDrop(props) {
  const images = props.images.map(image => {
    return (
      <div className="dragDrop__imageContainer">
        <img
          src={image.thumbnail_url}
          key={image.id}
          className="dragDrop__image"
          alt=""
        ></img>
      </div>
    );
  });

  function handleDragEnter(event) {
    event.preventDefault();
  }

  function handleDragLeave(event) {
    event.preventDefault();
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();

    const files = [...event.dataTransfer.files];

    // remove any non-image files
    const imageFiles = files.filter(file => {
      return file.type === "image/jpeg" || file.type === "image/png"
    });

    // build a formData object for each file
    const formDatas = imageFiles.map(file => {
      const formData = new FormData();
      formData.append('image', file);
      return formData;
    });

    // initiate file upload
    props.setFetchParameters({
      url: `${BASE_URL}${POST_IMAGES_ENDPOINT}`,
      method: 'POST',
      bodies: formDatas,
    });
  }

  return (
    <div className="dragDrop">
      <div className="dragDrop__innerContainer"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {images.length > 0 ?
          images
        :
          <p>No images yet</p>
        }
        {props.isLoading &&
          <div className="dragDrop__overlay">
            <h1>Loading...</h1>
          </div>
        }
      </div>
    </div>
  );
}