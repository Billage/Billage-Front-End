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
import ChatList from './components/ChatList';
import ShowPost from './components/ShowPost';
import MainBoards from './components/MainBoards';
import BoardNav from './components/BoardNav';
import Update from './components/Update';
import Scrap from './components/Scrap';
import FindId from './components/FindId';
import FindPw from './components/FindPw';
import Quit from './components/Quit';
import ChatListComponent from './components/ChatListComponent';
function App() {
  return (
    
    <Router>
      <div>

        <Switch>
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/SignUp_kakao" component={SignUp_kakao} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/Write" component={Write}/>
          <Route exact path="/Chatting" component={Chatting}/>
          <Route exact path="/ChatList" component={ChatList}/>
          <Route exact path="/ShowPost" component={ShowPost}/>
          <Route exact path="/Update" component={Update}/>
          <Route exact path="/" component={MainBoards}/>
          <Route exact path="/Scrap" component={Scrap}/>
          <Route exact path="/FindId" component={FindId}/>
          <Route exact path="/FindPw" component={FindPw}/>
          <Route exact path="/Quit" component={Quit}/>
          <Route exact path="/ChatListComponent" component={ChatListComponent}/>
        </Switch>

        {/* </Page> */}
      </div>
    </Router>
  );
}

export default App;