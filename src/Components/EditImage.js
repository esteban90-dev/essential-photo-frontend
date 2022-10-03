import React from 'react';
import './EditImage.css';
import ModalLayout from '../Layouts/ModalLayout';
import xIcon from '../images/x-icon.svg';
import useCallAPI from '../CustomHooks/useCallAPI';
import {BASE_URL, UPDATE_IMAGE_ENDPOINT} from '../settings';

export default function EditImage(props) {
  const [imageFormData, setImageFormData] = React.useState({
    title: props.image.title,
    description: props.image.description,
    tags: props.image.tags.map(tag => tag.name),
    isPublic: props.image.is_public,
  })

  const {data, isLoading, setFetchParameters} = useCallAPI();  

  function handleChange(event) {
    setImageFormData(prevData => {
      if (event.target.id === 'isPublic') {
        // handle isPublic checkbox toggling
        return {...prevData, isPublic: !prevData.isPublic}
      }
      // handle text box inputs
      return {...prevData, [event.target.id]: event.target.value} 
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('updating image');

    // build a formData object
    const formData = new FormData();
    formData.append('title', imageFormData.title);
    formData.append('description', imageFormData.description);
    formData.append('tags', imageFormData.tags);
    formData.append('is_public', imageFormData.isPublic);
    
    //submit image update request to api
    setFetchParameters({
      url: `${BASE_URL}${UPDATE_IMAGE_ENDPOINT}/${props.image.id}`,
      method: 'PATCH',
      bodies: [formData],
    });
  }

  // if the update request has already been made, 
  // update the associated image in state
  if (data.length > 0) {
    props.updateImage(data[data.length - 1]);
  }

  return (
    <ModalLayout>
      <main className="editImage">
        {isLoading &&
          <div className="editImage__overlay">
            <h1>Loading...</h1>
          </div>
        }
        <div className="editImage__innerContainer">
          <h2 className="editImage__title">Edit Image</h2>
          <img
            src={xIcon}
            className="editImage__closeIcon"
            alt="this is an x icon"
            onClick={props.close}
          ></img>
          <div className="editImage__imageContainer">
            <img
              src={props.image.thumbnail_url}
              className="editImage__image"
              alt=""
            ></img>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={imageFormData.title}
              onChange={handleChange}
            ></input>

            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={imageFormData.description}
              onChange={handleChange}
            ></input>

            <label htmlFor="tags">Tags:</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={imageFormData.tags}
              onChange={handleChange}
            ></input>

            <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              checked={imageFormData.isPublic}
              onChange={handleChange}
            ></input>
            <label htmlFor="isPublic">Is Public</label>

            <button type="submit" className="button button--wide">Update Image</button>
          </form>
        </div>
      </main>
    </ModalLayout>
  );
}