//제일 위에 보라색 nav bar 부분입니다.
import React from 'react';
import styled from "styled-components";
import { Img } from "../components/MainBoards";
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { setTwoToneColor } from '@ant-design/icons';
setTwoToneColor('#EBCAFD');
// nav 바를 감싸는 ul 태그 styled component 입니다.
const StyledNav = styled.ul` 
    height:120px;
    display:flex;
    align-items:center;
    justify-content:center;
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
const StyledTitle = styled.li`
    flex-basis: auto;
`;
// 통신을 위한 수정
const BoardNav = ({ showAddress, size, collapsed }) => {
    return (
        <div>
            <StyledNav>
                <StyledTitle>
                    <li><Img src="Img/logo.png" alt="로고" style={{ width: size === "soSmall" && '120px', visibility: collapsed ? 'visible' : 'hidden' }} />
                        <br />{collapsed ? showAddress : null}
                    </li>
                </StyledTitle>
            </StyledNav>
        </div>
    );
};

export default BoardNav;