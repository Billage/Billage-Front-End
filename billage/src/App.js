import React from 'react';
import SignUp from './SignUp';
import  SignUp_kakao from './SignUp_kakao';
import BorrowBoard from './BorrowBoard';
import { BrowserRouter,  Route } from 'react-router-dom';
import ShowPost from './ShowPost';
const App=()=>{
  return(
    <BrowserRouter>
                <Route exact path="/signUp" component={SignUp}/>
                <Route exact path="/signUp_kakao" component={SignUp_kakao}/>
                <Route exact path="/BorrowBoard" component={BorrowBoard}/>
                <Route exact path="/ShowPost" component={ShowPost}/>
    </BrowserRouter>
  );
};

export default App;
