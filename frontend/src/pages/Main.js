import React from 'react';
import loggedIn from "../functions/LoggedIn";
import MainPage from '../components/MainPage';

const Main = () => {
  return(
  <div>
    <div className="block-content">
      {loggedIn() ? <MainPage/> :<h1>Hello from Main </h1>}

    </div>
  </div>
  );
};

export default Main;
