import React, { Component } from 'react';
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Axios from 'axios';
import SignUp from './components/SignUp';
import SignUp_kakao from './components/SignUp_kakao';
import LoginPage from './components/LoginPage';
import Write from './components/Write';
import Chatting from './components/Chatting';
import ShowPost from './components/ShowPost';
import MainBoards from './components/MainBoards';
import BoardNav from './components/BoardNav';

// const Page = styled.html` 
// text-align: center;
//   `;

function App() {
  return (
    
    <Router>
      <div>
        {/* <Page> */}
        <Switch>
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/SignUp_kakao" component={SignUp_kakao} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/Write" component={Write}/>
          <Route exact path="/Chatting" component={Chatting}/>
          <Route exact path="/ShowPost" component={ShowPost}/>
          <Route exact path="/" component={MainBoards}/>
        </Switch>

        {/* </Page> */}
      </div>
    </Router>
  );
}

export default App;