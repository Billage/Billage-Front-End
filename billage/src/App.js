import React from 'react';
import SignUp from './SignUp';
import { BrowserRouter,  Route } from 'react-router-dom';
const App=()=>{
  return(
    <BrowserRouter>
                <Route exact path="/signUp" component={SignUp}/>
    </BrowserRouter>
  );
};

export default App;
