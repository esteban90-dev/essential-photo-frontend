import React from 'react';
import './VisitorLayout.css';
import VisitorHeader from '../Components/VisitorHeader';

export default function VisitorLayout(props) {
  return (
    <div className="visitorLayout">
      <VisitorHeader
        clearData={props.clearData}
        setFetchParameters={props.setFetchParameters}
        setSearchInfoText={props.setSearchInfoText}
      />
      {props.children}
    </div>
  );
}