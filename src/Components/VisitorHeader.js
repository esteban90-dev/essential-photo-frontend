import React from 'react';
import './VisitorHeader.css';
import {DOMAIN_NAME} from '../settings';

export default function VisitorHeader() {
  return (
    <header className="visitorHeader">
      <h1 className="visitorHeader__title">{DOMAIN_NAME}</h1>
      <div className="visitorHeader__search">
        <input
          type="text"
          className="visitorHeader__input"
          placeholder="Search by tag"
        ></input>
        <p className="visitorHeader__inputInfo">
          SEPARATE YOUR TAGS WITH A COMMA
        </p>
      </div>
    </header>
  );
}