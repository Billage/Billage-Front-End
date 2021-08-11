import React, { Component } from 'react';
import styled from "styled-components";
import logo_img from '../components/images/logo.png'
const LogoStyle = styled.header`
    text-align: center;
    height: auto;
    margin-top: 100px;
    margin-bottom: 30px;
`; 

class Logo extends Component {
    render() {
      return (
        <LogoStyle>
        <header>
          <a href = "/login"><img class="main_img" src={logo_img} alt="Billage logo"></img></a>
        </header>
        </LogoStyle>
      );
    }
  }

  export default Logo;