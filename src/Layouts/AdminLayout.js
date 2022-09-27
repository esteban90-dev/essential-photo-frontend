import React from 'react';
import AdminHeader from '../Components/AdminHeader';

export default function AdminLayout(props) {
  return (
    <div className="adminLayout">
      <AdminHeader/>
      <div className="adminLayout__bottom">
        {props.children}
      </div>
    </div>
  );
}