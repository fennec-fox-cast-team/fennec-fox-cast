import React, { useEffect} from 'react';
import {Helmet} from 'react-helmet';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import About from "./pages/About";
import NavBar from "./components/NavigationBar";
import './resources/styles/App.css';
import Registration from "./components/auth/RegistrationForm";
import Login from "./components/auth/Login";
import { Redirect } from 'react-router-dom'
import Chat from "./components/Chat";


function App() {
    const [state, setState] = React.useState({logged_in: false});
    const {logged_in} = state;

    function checkLoginStatus(){
        /*
        sendRequest('http://localhost:5000/check_in')
            .then(response =>{
                if (response.logged_in){
                    setState(prevState => ({...prevState, logged_in:true}));
                }
            })*/
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
              <Route exact path="/chat" component={() => window.location = 'https://10.25.129.244:5000/chat'} />

          </Switch>
      </div>
    </BrowserRouter>);
}

export default App;


