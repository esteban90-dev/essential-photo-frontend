import React from 'react';
import './VisitorLayout.css';
import VisitorHeader from '../Components/VisitorHeader';

export default function VisitorLayout(props) {
  return (
    <div className="visitorLayout">
      <VisitorHeader />
      {props.children}
    </div>
  );
}