import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Modal, Button, Space } from 'antd';
import styled from "styled-components";

styled(Modal)`
  button{
    background-color:red;
  }
`;
 const MyModal=({text})=>{
 
    const info=()=>{
        Modal.warning({
          title: '알림',
          content: (
            <div>
              <p>{text}</p>
              <p>아무거나</p>
            </div>
          ),
          onOk() {},
        });

        
      }
      
      return(
        <>
        <Button onClick={info}>Info</Button>
      </>
      );
 };

export default MyModal