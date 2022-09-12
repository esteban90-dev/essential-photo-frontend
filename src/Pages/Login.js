import React, { useEffect } from 'react';
import './Login.css';
import {useNavigate} from 'react-router-dom';
import AdminLayout from '../Layouts/AdminLayout';
import {Context} from '../context';
import {BASE_URL, LOGIN_ENDPOINT} from '../settings';

export default function Login(props) {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  })
  
  const [startFetch, setStartFetch] = React.useState(false);
  const [error, setError] = React.useState('');
  const {login} = React.useContext(Context);

  const navigate = useNavigate();

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(prevFormData => {
      return {...prevFormData, [name]: value}
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setStartFetch(true);
  }

  // once the form is submitted, send a post request to the 
  // api to attempt to login
  useEffect(() => {
    async function loginFetch() {
      const response = await fetch(`${BASE_URL}${LOGIN_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        //save response tokens in sessionStorage
        sessionStorage.setItem('access-token', response.headers.get('access-token'));
        sessionStorage.setItem('client', response.headers.get('client'));
        sessionStorage.setItem('uid', response.headers.get('uid'));

        //set login state
        login();

        //redirect to the admin page
        navigate("/admin/images", { replace: true });
      }
      else {
        //save error message in state
        const parsedResponse = await response.json();
        setError(parsedResponse.errors[0]);
      }
    }

    if (startFetch) {
      loginFetch();
      setStartFetch(false);
    }
  }, [startFetch, formData, navigate, login])

  return (
    <AdminLayout hasHeader={false}>
      <div className="login">
        <h1 className="login__title">Login</h1>

        <form className="login__form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="login__input"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          >
          </input>

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="login__input"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          >
          </input>

          {
            //if there are errors, display them here
            error && <p className="login__error">{error}</p>
          }

          <button className="button button--wide">Log In</button>
        </form>
      </div>
    </AdminLayout>
    
  )
}