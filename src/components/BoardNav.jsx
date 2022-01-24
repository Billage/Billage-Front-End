//제일 위에 보라색 nav bar 부분입니다.
import React, {useState} from 'react';
import styled from "styled-components";
import {Img, StyledButton} from "../components/MainBoards";
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  AppstoreTwoTone,
  getTwoToneColor, setTwoToneColor,
  RightCircleTwoTone,
  LeftCircleTwoTone
} from '@ant-design/icons';
setTwoToneColor('#EBCAFD');
const { Header, Sider, Content } = Layout;
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
    text-align: center;
    background:#ffffff
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
// 통신을 위한 수정
const BoardNav = ({showAddress, login})=>{
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
                {/* {login?
                (<li>
                <StyledButton><a href="/write"><Img src="img/plus.png" alt="글 등록"/></a></StyledButton>
                <StyledButton><a href="http://localhost:7000/auth/logout"><Img src="img/logout.png" alt="로그아웃"/></a></StyledButton>
                </li>)
                : 
                <a href = "/login"><StyledButton style={{marginRight:'30px',textAlign:'center',display:'flex',justifyContent:'space-evenly'}}><Img src="img/mypage.png" alt="로그인"/></StyledButton></a>
                }    */}
            </StyledIcon>
        </StyledNav>
        </div>
    );
};

export default BoardNav;