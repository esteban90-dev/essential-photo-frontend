import React from 'react';
import AdminHeader from '../Components/AdminHeader';
import plusIcon from '../images/plus-icon.svg';
import DragDrop from '../Components/DragDrop';

export default function AdminImages() {
  return (
    <>
      <AdminHeader />
      <div className="admin__pageContainer">
        <main className="adminimages__container">
          <header className="adminimages__header">
            <h3 className="adminimages__title">Images</h3>
            <button className="button">
              <img src={plusIcon} className="button__icon" alt="this is a plus icon"></img>
              <p>Add Images</p>
            </button>
          </header>
          <DragDrop />
        </main>
      </div>
    </>
  )
}