import React from 'react';
import SignUp from './SignUp';
import  SignUp_kakao from './SignUp_kakao';
import { BrowserRouter,  Route } from 'react-router-dom';
const App=()=>{
  return(
    <BrowserRouter>
                <Route exact path="/signUp" component={SignUp}/>
                <Route exact path="/signUp_kakao" component={SignUp_kakao}/>
    </BrowserRouter>
  );
};

export default App;
