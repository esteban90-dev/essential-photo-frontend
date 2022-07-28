import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';
import Admin from './Pages/Admin';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  console.log('rendered app');

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}></Route>
        <Route path="/admin" element={isLoggedIn ? <Admin /> : <Login setIsLoggedIn={setIsLoggedIn}/>}></Route>
      </Routes>
    </>
  )
}