import React, { useEffect} from 'react';
import {Helmet} from 'react-helmet';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import About from "./pages/About";
import NavBar from "./components/NavigationBar";
import './resources/styles/App.css';
import Registration from "./components/auth/RegistrationForm";
import Login from "./components/auth/Login";
import sendRequest from './functions/SendRequest';


function App() {
    const [state, setState] = React.useState({logged_in: false});
    const {logged_in} = state;

    function checkLoginStatus(){
        sendRequest('http://localhost:5000/check_in')
            .then(response =>{
                if (response.logged_in){
                    setState(prevState => ({...prevState, logged_in:true}));
                }
                console.log(response);
            })
    }

  useEffect(() => {
      checkLoginStatus();
  });
  return (
    <BrowserRouter>
        <Helmet titleTemplate='%s - Fennec' defaultTitle='Fennec Fox Cast'>
            <meta charSet='utf-8' />
        </Helmet>
      <div>
          <NavBar/>
          <Switch>
              <Route exact path="/" component={Main}/>
              <Route exact path="/contact" component={About}/>
              <Route exact path="/register" component={Registration}/>
              <Route exact path="/login" component={Login}/>
          </Switch>
      </div>
    </BrowserRouter>);
}

export default App;


