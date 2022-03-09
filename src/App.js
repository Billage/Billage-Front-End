import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import SignUp from './components/SignUp';
import SignUp_kakao from './components/SignUp_kakao';
import LoginPage from './components/LoginPage';
import Write from './components/Write';
import Chatting from './components/Chatting';
import ChatList from './components/ChatList';
import ShowPost from './components/ShowPost';
import MainBoards from './components/MainBoards';
import Update from './components/Update';
import Scrap from './components/Scrap';
import FindId from './components/FindId';
import FindPw from './components/FindPw';
import Quit from './components/Quit';
import ReviewWrite from './components/ReviewWrite';
import ReviewList from './components/ReviewList';
import ReviewEdit from './components/ReviewEdit';
import FindAccount from './components/FindAccount';
import MyModal from './components/MyModal';
import WriteList from './components/WriteList';
import MyInfoEdit from './components/MyInfoEdit';
import MyReviewList from './components/MyReviewList';


function App() {
  return (
    <Router>
      <div>
        <Switch>
        <Route exact path="/join" component={SignUp}/>
          <Route exact path="/join/kakao" component={SignUp_kakao}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/" component={MainBoards}/>
          <Route exact path="/write" component={Write}/>
          <Route exact path="/mypost" component={WriteList}/>
          <Route exact path="/chat/:roomId" component={Chatting}/>
          <Route exact path="/chat" component={ChatList}/>
          <Route exact path="/post/:id" component={ShowPost}/>
          <Route exact path="/post/:id/update" component={Update}/>
          <Route exact path="/" component={MainBoards}/>
          <Route exact path="/scrap" component={Scrap}/>
          <Route exact path="/FindId" component={FindId}/>
          <Route exact path="/FindPw" component={FindPw}/>
          <Route exact path="/delete" component={Quit}/>
          <Route exact path="/post/:id/review/write" component={ReviewWrite}/>
          <Route exact path="/post/:id/review" component={ReviewList}/> 
          <Route exact path="/review/edit/:id" component={ReviewEdit}/>
          <Route exact path="/myreview" component={MyReviewList}/>
          <Route exact path="/find" component={FindAccount}/>
          <Route exact path="/myModal" component={MyModal}/>
          <Route exact path="/myinfo" component={MyInfoEdit}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;