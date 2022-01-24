import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import '../ChatStyle.css';
import axios from 'axios';
import socketio from 'socket.io-client';
import send from '../components/images/send.png';
import useChat from "../useChat";
import moment from "moment";
import { message } from 'antd';

const TopStyled = styled.ul`
    display: flex;
    height: 25px;
    align-items:center;
    list-style:none;
`;
const Top = styled.div`
    padding-top: 1px;
    background-color: white;
    //상단고정
    position: sticky;
    top: 0;
    z-index: 1;

`;
const ChatList = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  overflow-y: auto;

`;

const msessage = styled.span`
    // display: inline-block;
    // padding: 7px 15px;
    // margin-bottom: 20px;
    // margin-top: 5px;
`;

const Nick = styled.div`
    font-size: 5px;
    color: gray;
    margin-bottom: -4px;
`;

const InputStyled = styled.input`
    margin: 5px 5px 5px 5px;
    display: flex;
    width: 95%;
    border:none;
    outline:none;
`;
const InputBox = styled.div`
    margin: 5px 10px 5px 10px;
    display: flex;
    padding: 2px;
    border: solid 1px lightgray;
    border-radius : 10px;
    height: 25px;
    align-items:center;
    background-color: white;
`;
const Bottom = styled.div`
  background-color: white;
  // 하단고정
    position: fixed;
    bottom:0px;
    width: 100%;

`;

const Button = styled.button`
    border: none;
    background: none;
    margin-top: 3px;
`;

//날짜 스타일 
const Line = styled.div`
    display: flex;
    flex-basis: 100%;
    align-items : center;
    color: rgba(0, 0, 0, 0.35);
    font-size: 13px;
    margin: 8px 0px;

    ::before {
      content: "";
      flex-grow: 1;
      margin: 0px 16px;
      background: rgba(0, 0, 0, 0.35);
      height: 1px;
      line-height: 0px;
    }
    ::after {
      content: "";
      flex-grow: 1;
      margin: 0px 16px;
      background: rgba(0, 0, 0, 0.35);
      height: 1px;
      line-height: 0px;
    }
`;
//시간 스타일
const MyTime = styled.span`
    color: gray;
    font-size: 5px;
    margin-right: 4px;
`;
const AnotherTime = styled.span`
    color: gray;
    font-size: 5px;
    margin-left: 4px;
`;

// const socket = socketio.connect("http://localhost:3001");  
const Chatting = (props) => {
    const { roomId } = props.match.params;
    const { messages, sendMessage } = useChat(roomId);
    const [newMessage, setNewMessage] = React.useState(""); //채팅 입력 값

    const handleNewMessageChange = (event) => {
      setNewMessage(event.target.value);
    };

    const onSendMessage = () => {
      sendMessage(newMessage);
      setNewMessage("");
    };
    
    //뒤로가기 icon 
    const backClick = () => {
      window.history.back();
    }

    return (
      <div>
        <Top> 
          <TopStyled>
              <li onClick={backClick} style={{'color' : 'gray'}}>⬅</li>
              <li style={{'margin-left' : '15px', 'font-weight' : 'bold'}}>닉네임</li>
              {/* <li style={{'margin-left' : '15px', 'font-weight' : 'bold'}}>{roomId}</li> */}
          </TopStyled>
        <hr/>
        </Top>

        <div>

        <ChatList>
          {messages.map((msg, i) => {   
            msg.ownedByCurrentUser ? (
              <div>
                <div className="myChat">
                <MyTime>{msg.timeStamp}</MyTime>
                <span className="msg">{msg.body}</span> 
                </div>
              </div>
            ) : (
              <div>
                <div className="anotherChat">
                <span className="msg">{msg.body}</span>
                <AnotherTime>{msg.timeStamp}</AnotherTime>
                </div>
              </div>
            );
          })}
         </ChatList>

            {/* <ChatList>
              <Line>2021년 9월 6일</Line>
              <div className="myChat">
                <MyTime>2:40</MyTime>
                <span className="msg">안녕하세요 빌리고 싶어요!</span> 
              </div>
              <div className="anotherChat">
                <span className="msg">안녕하세요</span>
                <AnotherTime>11:20</AnotherTime>
              </div>
              <div className="anotherChat">
                <span className="msg">어디서 만날까요?</span>
                <AnotherTime>11:20</AnotherTime>
              </div>
              <div className="myChat">
                <MyTime>2:40</MyTime>
                <span className="msg">강남역으로 갈게요</span> 
              </div>
            </ChatList>  */}

        </div>
        <Bottom>
          <form onSubmit={onSendMessage}>
            <InputBox>
              <InputStyled
                value={newMessage}
                onChange={handleNewMessageChange}
              />
              <Button>
              <img src={send} style={{width: '20px', height: 'auto'}}/>
              </Button>
            </InputBox>
            </form>
        </Bottom>

      </div>
    );
  };

export default Chatting;