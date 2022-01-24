import React, { Component } from 'react';
import billage_login_img from './images/bill_login.png'
import kakao_login_img from './images/kakao_login.png'

class Login_btn extends Component {
    render() {
      const howToLogin = this.props.title;
      let img;
      if(howToLogin==='빌리지') {
         return <img src={billage_login_img} alt="빌리지ID 로그인" style={{'margin-left' : '5px'}}></img>
         
      }
      else if(howToLogin==='카카오톡') {
         return <img src={kakao_login_img} alt="카카오톡으로 로그인" style={{'margin-left' : '5px'}}></img>
      }

    }
  }
  export default Login_btn;