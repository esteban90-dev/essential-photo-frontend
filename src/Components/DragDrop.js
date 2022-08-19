import React from 'react';

export default function DragDrop(props) {
  const images = props.images.map(image => {
    return <img src={image.thumbnail_url} key={image.id} className="dragdrop__image"></img>
  });

  return (
    <div className="dragdrop">
      <div className="dragdrop__innerContainer">
        {images.length > 0 ?
          images
        :
          <p>No images yet</p>
        }
        {props.isLoading && 
          <div className="dragdrop__loading">
            <h1>Loading...</h1>
          </div>
        }
      </div>
    </div>
  );
}