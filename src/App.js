import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';
import AdminImages from './Pages/AdminImages';
import NotFound from './Pages/NotFound';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}></Route>
        <Route path="/admin/images" element={isLoggedIn ? <AdminImages /> : <Login setIsLoggedIn={setIsLoggedIn}/>}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  )
}