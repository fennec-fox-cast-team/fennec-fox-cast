import React from 'react';
import {Helmet} from 'react-helmet';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Contact from "./pages/Contact";
import NavBar from "./components/NavigationBar";
import './resources/styles/App.css';
import Registration from "./components/auth/RegistrationForm";
import Login from "./components/auth/Login";


function App() {
  return (
    <BrowserRouter>
        <Helmet titleTemplate='%s - Fennec' defaultTitle='Fennec Fox Cast'>
            <meta charSet='utf-8' />
        </Helmet>
      <div>
          <NavBar/>
          <Switch>
              <Route exact path="/" component={Main}/>
              <Route exact path="/contact" component={Contact}/>
              <Route exact path="/register" component={Registration}/>
              <Route exact path="/login" component={Login}/>
          </Switch>
      </div>
    </BrowserRouter>);
}

export default App;


