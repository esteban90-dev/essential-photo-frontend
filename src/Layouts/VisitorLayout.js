import React from 'react';
import VisitorHeader from '../Components/VisitorHeader';

export default function VisitorLayout(props) {
  return (
    <div className="visitorLayout">
      <VisitorHeader />
      {props.children}
    </div>
  );
}