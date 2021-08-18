//제일 위에 보라색 nav bar 부분입니다.
import React, {useState} from 'react';
import styled from "styled-components";
import {Img, StyledButton} from "./BorrowBoard";


// nav 바를 감싸는 ul 태그 styled component 입니다.
const StyledNav=styled.ul` 
height:70px;
display:flex;
align-items:center;
justify-content:space-between;
list-style:none;
margin:0;
padding:0 20px 0 20px;
color: white;
background:#A352CC;
font-size:20px;
font-weight:bold;
`;
;
const BoardNav=({showAddress, boardName})=>{
    return(
        <StyledNav>
        <li style={{fontWeight:'normal'}}>{showAddress}</li>
        <li>{boardName}</li>
        <li>
        <StyledButton onClick={()=>{alert('글 등록 버튼입니다.')}}><Img src="img/plus_w.png" alt="글 등록"/></StyledButton>
        <StyledButton onClick={()=>{alert('마이페이지 버튼입니다.')}}><Img src="img/mypage_w.png" alt="마이페이지"/></StyledButton>
        </li>
        </StyledNav>
    );
};

export default BoardNav;
