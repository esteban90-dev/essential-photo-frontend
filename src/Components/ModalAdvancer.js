import React from 'react';

export default function ModalAdvancer(props) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className={isHovered ? 
        `modalAdvancer__${props.position} modalAdvancer--hovered`
        :
        `modalAdvancer__${props.position}`
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => props.setNextImage()}
    >
      {isHovered && 
        <img
          src={props.icon}
          alt="this is an arrow icon"
          className="modalAdvancer__icon"
        ></img>
      }
    </div>
  )
}