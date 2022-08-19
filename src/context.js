import React from 'react';

const Context = React.createContext();

function ContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  function login() {
    setIsLoggedIn(true);
  }

  function logout() {
    setIsLoggedIn(false);
  }

  return (
    <Context.Provider value={{isLoggedIn, login, logout}}>
      {props.children}
    </Context.Provider>
  );
}

export {ContextProvider, Context};