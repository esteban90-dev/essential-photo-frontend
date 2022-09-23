import React from 'react';
import './AdminImageCard.css';
import editIcon from '../images/pencil-icon.svg';

export default function AdminImageCard(props) {
  const [isHovered, setIsHovered] = React.useState(false);

  function getEditIconClass() {
    if (isHovered) {
      return 'adminImageCard__icon adminImageCard__icon--hovered';
    }
    return 'adminImageCard__icon';
  }

  return (
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
          ></img>
        </div>
      </div>
    </div>
  )
}