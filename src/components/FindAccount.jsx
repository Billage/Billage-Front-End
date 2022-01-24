import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import axios from 'axios';
import 'antd/dist/antd.css';
import { Tabs, Button } from 'antd';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import '../App.css';
import FindId from './FindId';
import FindPw from './FindPw';

const { TabPane } = Tabs;

const Head = styled.div`
    background-color:#A352CC;
    height:60px;
    text-align:center;
    color:#ffffff;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:bold;
    font-size:16px; 
`;
const TabBar = styled(Tabs)`


.ant-tabs-ink-bar {
  padding:0px;
  margin:0px;
}
.ant-tabs-tab-btn{
  width:42vw;
  text-align:center;
  padding:0px;
  margin:0px;
  
}
#rc-tabs-1-tab-1{
  border-right:2px solid;
  padding:0px;
  margin:0px;
}
#rc-tabs-1-tab-2{
  border-left:2px solid;
  padding:0px;
  margin:0px;
}
`;
const FindAccount=()=>{
    const callback=(key)=> {
        console.log(key);
      };
      
    return(
        <>
        <Head>아이디/비밀번호 찾기</Head>
    <TabBar centered defaultActiveKey="1" onChange={callback}>
    <TabPane tab="아이디 찾기" key="1">
    <FindId />
    </TabPane>
    <TabPane tab="비밀번호 찾기" key="2">
    <FindPw />
    </TabPane>
  </TabBar>
        </>
    );

};

export default FindAccount;