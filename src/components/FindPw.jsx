import React, { Component } from 'react';
import axios from 'axios';
import styled from "styled-components";

const Page=styled.body`
    margin:0;
    padding:20px;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const InputComponent=styled.input`
    border:1px solid #E5E5E5;
    outline:none;
    ::placeholder{
        color:#E5E5E5;
    }
    border-radius: 15px;
    width:100%;
    height:35px;
    margin-bottom: 10px;
`;

const SubmitButton=styled.button`
    margin-top:30px;
    border:none;
    width:350px;
    height:40px;
    background-color:#A352CC;
    border-radius:30px;
    color:white;
    font-weight:bold;
    font-size:18px;
    text-align:center;
`;
const Message=styled.input`
    border: none;
    background-color: white;
    color: red;
    width: 100%;
    text-align: center;
    margin-top: 30px;
`;

class FindPw extends Component {
    constructor(props) {
      super(props);
      this.state = {
          result : false,
          secret : "",
          user_data : "",
          change : false,
      }
  }
  
    _searchPassword = async function() {
        
        const email = document.getElementsByName('search_pw_email')[0].value.trim();
        const id = document.getElementsByName('search_pw_id')[0].value.trim();

        // const user_id = this.state.user_data.id;

        if(!(email&&id)){
            document.getElementsByName('message')[1].value = '모든 항목을 입력해주세요';
            return;
        }else if(!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(email)){
            //이메일 형식에 맞는 값이 들어왔는지 확인합니다.
            document.getElementsByName('message')[1].value = '올바르지 않은 이메일입니다. 다시 입력해주세요.';
            return;
        }

        const obj = { id: id , email : email}
        console.log(obj);

        const res = await axios('/search/pw', {
            method : 'POST',
            data : obj,
        })

      if(res.data === false) {
        document.getElementsByName('message')[0].value = '일치하는 회원정보가 없습니다.';
        return;
      }
  
      document.getElementsByName('search_pw_id')[0].value = '';
  
      alert(res.data.result[0].email + '로 임시 비밀번호가 수신되었습니다.');
      return this.setState({ 
        result : true, 
        secret : res.data.secret, 
        user_data : res.data.result[0]
      })
    }
  
    render() {
      return (

        <Page>
        <p style={{'color':'gray', 'fontSize':'13px'}}>회원가입 시 등록한 이메일과 아이디를 아래에 입력하세요.</p>
        <br/>
        <form>

        <InputComponent 
            name="id"
            label="아이디" 
            placeholder="아이디"
            type='text' 
            maxLength='20'
            name='search_pw_id'
        /> 
        <InputComponent 
            name="email"
            label="이메일" 
            placeholder="이메일"
            type='text' 
            name='search_pw_email'
        /> 
        <div>
        <SubmitButton type='button' value='비밀번호찾기' name='search_pw_submit'
            onClick={() => this._searchPassword()}
        >
        비밀번호 찾기
        </SubmitButton>
        </div>
        </form>
        <Message name='message' disabled/>
        </Page>

 
      );
    }
}


export default FindPw;