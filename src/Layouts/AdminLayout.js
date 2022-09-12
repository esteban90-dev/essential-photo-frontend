import React from 'react';
import './AdminLayout.css';
import AdminHeader from '../Components/AdminHeader';

export default function AdminLayout(props) {
  return (
    <div className="adminLayout">
      {props.hasHeader && 
        <AdminHeader/>
      }
      <div className="adminLayout__bottom">
        {props.children}
      </div>
    </div>
  );
}