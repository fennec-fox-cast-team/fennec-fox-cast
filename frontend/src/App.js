import React from 'react';
import {Helmet} from 'react-helmet';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Contact from "./pages/Contact";
import NavBar from "./components/NavigationBar";
import './resources/styles/App.css';


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
          </Switch>
      </div>
    </BrowserRouter>);
}

export default App;
