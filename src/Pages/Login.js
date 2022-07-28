import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login(props) {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  })
  
  const [startFetch, setStartFetch] = React.useState(false);
  const [error, setError] = React.useState('');

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
    async function login() {
      const response = await fetch('http://127.0.0.1:3001/api/v1/auth/sign_in', {
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

        //set login state to true
        props.setIsLoggedIn(true);

        //redirect to the admin page
        navigate("/admin", { replace: true });
      }
      else {
        //save error message in state
        const parsedResponse = await response.json();
        setError(parsedResponse.errors[0]);
      }
    }

    if (startFetch) {
      login();
    }
    setStartFetch(false);
  }, [startFetch])

  console.log('rendered login page');

  return (
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

        <button className="login__button">Log In</button>
      </form>
    </div>
  )
}