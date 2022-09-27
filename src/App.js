import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import {Context} from './context';
import Login from './Pages/Login';
import AdminImages from './Pages/AdminImages';
import Images from './Pages/Images';
import NotFound from './Pages/NotFound';

export default function App() {
  const {isLoggedIn} = React.useContext(Context);

  return (
    <>
      <Routes>
        <Route path="/" element={<Images />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin/images" element={isLoggedIn ? <AdminImages /> : <Navigate to="/login" replace={true}></Navigate>}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  )
}