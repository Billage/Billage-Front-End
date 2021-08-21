//제일 위에 보라색 nav bar 부분입니다.
import React, {useState} from 'react';
import styled from "styled-components";
import {Img, StyledButton} from "../components/BorrowBoard";

// nav 바를 감싸는 ul 태그 styled component 입니다.
const StyledNav=styled.ul` 
    height:120px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    list-style:none;
    margin:0;
    padding:0 20px 0 20px;
    color: gray;
    font-size:15px;
    font-weight:bold;
    
    `;
;
const StyledTitle=styled.li`
    flex-basis: 80%;
`;
const StyledIcon=styled.li`
    flex-basis: 50px;
    white-space: nowrap;
`;
const StyledFirst=styled.li`
     flex-basis: 70px;
`;

const BoardNav=({showAddress})=>{
    return(
        <div>
        <StyledNav>
            <StyledFirst><li></li></StyledFirst>
            <StyledTitle>
            <li><Img src="Img/logo.png" alt="로고" />
            <br/>{showAddress}
            </li>
            </StyledTitle>
            <StyledIcon>
                <li>
                <StyledButton onClick={()=>{alert('글 등록 버튼입니다.')}}><Img src="img/plus.png" alt="글 등록"/></StyledButton>
                <StyledButton onClick={()=>{alert('마이페이지 버튼입니다.')}}><Img src="img/mypage.png" alt="마이페이지"/></StyledButton>
                </li>
            </StyledIcon>
  
        </StyledNav>

        </div>
        

        // <StyledNav>
        // <div>
        // <StyledTitle><Img src="Img/logo.png" alt="로고" /></StyledTitle>
        // <StyledButton onClick={()=>{alert('글 등록 버튼입니다.')}}><Img src="img/plus.png" alt="글 등록"/></StyledButton>
        // <StyledButton onClick={()=>{alert('마이페이지 버튼입니다.')}}><Img src="img/mypage.png" alt="마이페이지"/></StyledButton>
        // </div>
        // </StyledNav>

        // <table>
        //     <td><StyledTitle><Img src="Img/logo.png" alt="로고" /></StyledTitle></td>
        
        //     <td><StyledButton onClick={()=>{alert('글 등록 버튼입니다.')}}><Img src="img/plus.png" alt="글 등록"/></StyledButton>
        //     <StyledButton onClick={()=>{alert('마이페이지 버튼입니다.')}}><Img src="img/mypage.png" alt="마이페이지"/></StyledButton>
        //     </td>
        // </table>

    );
};

export default BoardNav;