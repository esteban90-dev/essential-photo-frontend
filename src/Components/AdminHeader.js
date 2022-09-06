import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {BASE_URL, LOGOUT_ENDPOINT} from '../settings';

export default function AdminHeader() {
  const [startFetch, setStartFetch] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function logout() {
      const response = await fetch(`${BASE_URL}${LOGOUT_ENDPOINT}`, {
        method: 'DELETE',
        headers: {
          'access-token': sessionStorage.getItem('access-token'),
          'client': sessionStorage.getItem('client'),
          'uid': sessionStorage.getItem('uid'),
      }});

      // log an error to the console if the response to the logout request is not a 200
      if (!response.ok) {
        console.error('logout request unsuccessful');
      }
    }

    if (startFetch) {
      // send the logout request
      logout();

      // clear tokens out of sessionStorage
      sessionStorage.removeItem('access-token');
      sessionStorage.removeItem('client');
      sessionStorage.removeItem('uid');

      // redirect to the login page
      navigate("/login", { replace: true });

      setStartFetch(false);
    }
  }, [startFetch, navigate])

  return (
    <header className="adminheader">
      <h1>Admin</h1>
      <button
        className="adminheader__logout"
        onClick={() => {setStartFetch(true)}}
      >
        Logout
      </button>
    </header>
  )
}