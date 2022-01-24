import React, { useState, useEffect } from 'react'
import styled from "styled-components";

const Page=styled.body`
    margin:0;
    padding:20px;
    display:flex;
    flex-direction:row;
    justify-content: center; 
    align-items:center;
`;
// 탈퇴
const SubmitButton1=styled.button`
    margin:5px;
    border:none;
    width:200px;
    height:40px;
    color:#A352CC;
    font-weight:bold;
    font-size:18px;
    text-align:center;
`;
// 취소
const SubmitButton2=styled.button`
    margin:5px;
    border:none;
    width:200px;
    height:40px;
    background-color:#A352CC;
    color:white;
    font-weight:bold;
    font-size:18px;
    text-align:center;
`;


function Quit(props) {
    
    const onClickQuit = (event) => {
        event.preventDefault(); 
        props.history.push('/');
    }
    const onClickBack = (event) => {
        event.preventDefault(); 
        props.history.push('/');
    }

   return (
       <Page>

          <SubmitButton1 onClick={onClickQuit}>탈퇴하기</SubmitButton1>
          <SubmitButton2 onClick={onClickBack}>돌아가기</SubmitButton2>
        </Page>
    )
}

export default Quit