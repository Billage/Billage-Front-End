import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import ChatListComponent from './ChatListComponent';
import { Link } from 'react-router-dom';

const List = styled.div`
    font-family:'KoddiUDOnGothic-Regular';
`;

//스크롤 할때 상단 고정zz
const PageStyled = styled.div`
    position: sticky;
    top: 0px;
    z-index: 1;
    background-color: white;
`;

const ChatList = () => {
    const [chatList, setChatList] = useState([]); //채팅 리스트
    //채팅목록 가져오는 통신입니다
    useEffect(() => {
        axios.get("http://localhost:7000/chat",
            { withCredentials: true })
            .then((res) => {
                setChatList(res.data);       
            }).catch((error) => {
                console.error(error)
            })
        
    }, []);

    return (
        <>
            <PageStyled>
                <p style={{ fontSize: '16px', color: '#A352CC', fontWeight: 'bolder', textAlign: 'center' }}>채팅</p>
                <hr></hr>
            </PageStyled>
            <List>
                {chatList.map((data) => { //채팅 목록
                    return (<Link to={`/chat/${data.roomId}`}>
                        <ChatListComponent
                            user={data.user1}
                            content={data.latest}
                            address={data.user1Address}
                        />
                    </Link>
                    );
                })}
            </List>
        </>
    );
};

export default ChatList;