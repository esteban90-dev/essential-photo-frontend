import React from 'react';
import './VisitorHeader.css';
import {DOMAIN_NAME} from '../settings';

export default function VisitorHeader() {
  return (
    <header className="visitorHeader">
      <h1 className="visitorHeader__title">{DOMAIN_NAME}</h1>
    </header>
  );
}