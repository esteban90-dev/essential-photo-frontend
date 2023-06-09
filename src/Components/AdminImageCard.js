import React from 'react';
import './AdminImageCard.css';
import EditImage from './EditImage';
import editIcon from '../images/pencil-icon.svg';

export default function AdminImageCard(props) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isEditImageDisplayed, setIsEditImageDisplayed] = React.useState(false);

  function getEditIconClass() {
    if (isHovered) {
      return 'adminImageCard__icon adminImageCard__icon--hovered';
    }
    return 'adminImageCard__icon';
  }

  function closeEditImage() {
    setIsEditImageDisplayed(false);
  }

  return (
    <>
      {isEditImageDisplayed &&
        <EditImage
          image={props.image}
          close={closeEditImage}
          updateImage={props.updateImage}
        />
      }
      <div className="adminImageCard">
        <div className="adminImageCard__wrapper">
          <div className="adminImageCard__imageContainer">
            <img
              src={props.image.thumbnail_url}
              className="adminImageCard__image"
              alt=""
            ></img>
          </div>
          <div className="adminImageCard__footer">
            <img
              src={editIcon}
              className={getEditIconClass()}
              alt="this is an edit icon"
              onMouseEnter={() => {setIsHovered(true)}}
              onMouseLeave={() => {setIsHovered(false)}}
              onClick={() => setIsEditImageDisplayed(true)}
            ></img>
          </div>
        </div>
      </div>
    </>
  )
}