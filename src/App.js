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
import Update from './components/Update';
import Scrap from './components/Scrap';
import FindId from './components/FindId';
import FindPw from './components/FindPw';
import Quit from './components/Quit';
import ReviewWrite from './components/ReviewWrite';
import FindAccount from './components/FindAccount';
import MyModal from './components/MyModal';
import MyInfoEdit from './components/MyInfoEdit';
function App() {
  return (
    
    <Router>
      <div>

        <Switch>
        <Route exact path="/join" component={SignUp} />
          <Route exact path="/join/kakao" component={SignUp_kakao} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/" component={MainBoards}/>
          <Route exact path="/write" component={Write}/>
          <Route exact path="/chat/:post/:writer" component={Chatting}/>
          <Route exact path="/post/:id" component={ShowPost}/>
          <Route exact path="/Update" component={Update}/>
          <Route exact path="/" component={MainBoards}/>
          <Route exact path="/Scrap" component={Scrap}/>
          <Route exact path="/FindId" component={FindId}/>
          <Route exact path="/FindPw" component={FindPw}/>
          <Route exact path="/Quit" component={Quit}/>
          <Route exact path="/reviewWrite" component={ReviewWrite}/>
          <Route exact path="/FindAccount" component={FindAccount}/>
          <Route exact path="/myModal" component={MyModal}/>
          <Route exact path="/myInfo" component={MyInfoEdit}/>
        </Switch>

        {/* </Page> */}
      </div>
    </Router>
  );
}

export default App;