import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import axios from 'axios';
import socketio from 'socket.io-client';
import send from '../components/images/send.png'
const TopStyled = styled.ul`
    display: flex;
    height: 25px;
    align-items:center;
    list-style:none;
    
    //상단고정
    position: sticky;
    top: 0px;
    z-index: 1;
`;

//채팅창 하단 고정
// const BottomFix = styled.div`
    
//     display: flex;
//     position: fixed;
//     bottom: 0px;
//     // z-index: 1;
// `;
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

    // 하단고정
    // position: fixed;
    bottom: 0px;
    // width: 100%;
`;
const Button = styled.button`
    border: none;
    background: none;
    margin-top: 3px;
`;

const Chatting = (props) => {
    // const { roomId } = props.match.params; // Gets roomId from URL
    const [chatName, setChatName]=useState('채팅방이름');

    const { messages, sendMessage } =  useState('');
    const [newMessage, setNewMessage] = React.useState(""); // Message to be sent
  
    // 기존의 채팅 내용을 담아두고 UI와 직접 연결되는 상태값
    const [chatMonitor, setChatMonitor] = useState([]);
    //서버에서 받은 갱신된(새로 추가된) 내용을 받는 상태값
    const [recentChat, setRecentChat] = useState('');

       
    //입력 값 저장하는 상태값 
    const handleNewMessageChange = (event) => {
      setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
      sendMessage(newMessage);
      setNewMessage("");
      //enter

    };
    const backClick = () => {
      window.history.back();
    }

     // 서버에서 갱신된 내용(recentChat)을 받았을 때 로컬 채팅창에 추가
     useEffect(() => {
        recentChat.length > 0 && setChatMonitor([...chatMonitor, recentChat]);
        setRecentChat('');
        // 채팅값 초기화 
    }, [recentChat]);


    //  // 스크롤을 하단으로
    // const scrollToBottom = () => {
    //     document.getElementById('chatMonitor').scrollBy({ top: 100 });
    // };
    // // 이때 async, await 구문을 활용해서 아래 함수가 채팅방이 갱신되고 나서 실행되도록 설정
    // useEffect(async () => {
    //     (await recentChat.content?.length) > 0 &&
    //     setChatMonitor([...chatMonitor, recentChat]);
        

    //     scrollToBottom();
    //     setRecentChat('');
    // }, [recentChat]);


    return (
      <div>
        
        <TopStyled>
            <li onClick={backClick} style={{'color' : 'gray'}}>⬅</li>
            <li style={{'margin-left' : '15px', 'font-weight' : 'bold'}}>{chatName}</li>
        </TopStyled>
        <hr/>

        <div>
          <ol>
            {/* {messages.map((message, i) => (
              <li
                key={i}
                className={`message-item ${
                  message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
              >
                {message.body}
              </li>
            ))} */}

          </ol>
        </div>

            <InputBox>
            <InputStyled
                value={newMessage}
                onChange={handleNewMessageChange}
            />
            <Button onClick={handleSendMessage}>
            <img src={send} style={{width: '20px', height: 'auto'}}/>
            </Button>
            </InputBox>

      </div>
    );
  };

export default Chatting;