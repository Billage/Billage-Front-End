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
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';

const Page = styled.html` 
text-align: center;
  `;

function App() {
  return (
    
    <Router>
      <div>
        <Page>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
        </Page>
      </div>
    </Router>
  );
}

export default App;