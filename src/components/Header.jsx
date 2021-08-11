import React, { Component } from 'react';
import styled from "styled-components";
import plus_img from '../components/images/plus.png';
import mypage_img from '../components/images/mypage.png';

const HeaderStyle = styled.div`
   
    height: 50px;
    width: 412px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #A352CC;

    margin-left:auto; 
    margin-right:auto;
`; 

const Font = styled.div`
    text-align: center;
    line-height: 50px;
    color: white;
    display: inline;
`; 

class Header extends Component {
    render() {
      return (
        <HeaderStyle>
        <div>
            <table className="HeaderTable">
              <tr className="HeaderTr">
                <td className="HeaderTd"><Font>##동</Font></td>
                <td className="HeaderTd">  </td>
                <th className="HeaderTh"><Font>빌려줄게요</Font></th>
                <td className="HeaderTd"><a href="/"><img src={plus_img} alt="plus"></img></a></td>
                <td className="HeaderTd"><a href="/"><img src={mypage_img} alt="plus"></img></a></td>
              </tr>
            </table>

        </div>
        </HeaderStyle>
      );
    }
  }

  export default Header;