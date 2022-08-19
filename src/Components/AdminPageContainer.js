import React from 'react';
import AdminHeader from '../Components/AdminHeader';

export default function AdminPageContainer(props) {
  return (
    <div className="admin__pageContainer">
      <AdminHeader/>
      <div className="admin__bottom">
        {props.children}
      </div>
    </div>
  );
}