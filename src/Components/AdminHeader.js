import React, { useEffect } from 'react';
import './AdminHeader.css';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {Context} from '../context';
import {BASE_URL, LOGOUT_ENDPOINT} from '../settings';

export default function AdminHeader() {
  const [startFetch, setStartFetch] = React.useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const {logout} = React.useContext(Context);

  useEffect(() => {
    async function logoutFetch() {
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
      logoutFetch();

      // clear tokens out of sessionStorage
      sessionStorage.removeItem('access-token');
      sessionStorage.removeItem('client');
      sessionStorage.removeItem('uid');

      // clear login state
      logout();

      // redirect to the login page
      navigate("/login", { replace: true });

      setStartFetch(false);
    }
  }, [startFetch, navigate, logout])

  return (
    <header className="adminHeader">
      <h1>Admin</h1>
      {location.pathname === "/admin/images" ? 
        <Link to="/admin" className="adminHeader__link adminHeader__link--active">Images</Link>
        :
        <Link to="/admin" className="adminHeader__link">Images</Link>
      }
      <button
        className="adminHeader__logout"
        onClick={() => {setStartFetch(true)}}
      >
        Logout
      </button>
    </header>
  )
}