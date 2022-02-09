import React  from 'react';
import styled from "styled-components";

// 채팅 하나 전체를 묶는 div 태그의 스타일링
const Chat=styled.div`
    border-bottom: solid 2px #E5E5E5;
    height:100px;
    width:95%;
    margin:auto;
    // margin-top: 10px;
    box-sizing: border-box;
    padding-left:15px;
    padding-right: 15px;
    background:white;
    position:relative;
    &:hover { //목록 위에 커서 올릴경우
        background:#E5E5E5;
    }
`;
//채팅목록 제일 상단(사용자이름, 주소) 스타일링
const ChatHeader=styled.div`
    display: flex;
    justify-content:left;
    margin-bottom:-10px;
    margin-top:10px;
    // margin-top: 0px;
`;
const ChatRight = styled.div`
    display: flex;
    justify-content:right;
`;
// 채팅목록 제일 하단 (대여기간, 대여비) 스타일링
const ChatFooter=styled.div`
    position:relative;
    font-size:15px;
    display: flex;
    justify-content:space-between;
`;

const ChatListComponent=({user, content, address, read})=>{
    return(
        <Chat>
        <ChatHeader>
        <p style={{
        fontSize:'18px', fontWeight:'bold', marginRight:'15px'}}>{user}</p>
        <p style={{
        fontSize:'13px', color: '#7D7D7D', marginTop: '0px'}}>{address}</p>
        </ChatHeader>
        <ChatRight>        
            <div style={{color:'#7D7D7D',
                fontSize:'12px'}}>{read}</div>
        </ChatRight>

        <ChatFooter>
            <div>{content}</div>
        </ChatFooter>
        </Chat>
    )
};

export default ChatListComponent;