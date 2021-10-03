//import logo from './logo.svg';
//import './style/main.css';
//import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import React, { useState } from "react";
import ReactDOM  from "react";

import {Login} from "./components/Login";
import {SignUp} from "./components/SignUp";
import {Dash} from "./components/Dash";
import {AboutUs} from "./components/AboutUs";
import {ContactUs} from "./components/ContactUs";
import {History} from "./components/History";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
//const Login = lazy(()=>retryDynamicImport(() => import("./components/Login")));

function App() {

  const [bool, setBool] = useState(false);
  const [username, setUsername] = useState();

  const isLogin = (value) =>{
    console.log(value)
    setBool(value.bool)
    setUsername(value.username)
    console.log(value.bool,value.username)

  }

  return (
  
    <Router>
      <Switch>
      <Route
      exact
      path = "/login"
      name = "Login"
      component = {() => <Login fun={isLogin}/>} /> 

      
      {bool ? (<Route path = "/aboutus" name = "AboutUs" component = {AboutUs}/>):(<Redirect to = "/login"/>)}

      
      {bool ? (<Route path = "/contactus" name = "ContactUs" component = {ContactUs}/>) : (<Redirect to = "/login"/>)}


      
      {bool ? (<Route path = "/history" name = "History" component = {() => <History user={username}/>}/>) : (<Redirect to = "/login" />)}

      {bool ? (<Route path = "/dash" name = "Dash" component = {() => <Dash user={username}/>}/>) : (<Redirect to = "/login"/>)}

      <Route
      exact
      path = "/signup"
      name = "SignUp"
      component = {SignUp}/>

  
      
      </Switch>
    </Router>    

  );
}

export default App;
