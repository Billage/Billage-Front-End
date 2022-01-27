import React, {useState, useEffect} from 'react';
import BoardNav from './BoardNav';
import styled from "styled-components";
import axios from 'axios';
import PostComponent from './PostComponent';
import ChatListComponent from './ChatListComponent';
import { Link } from 'react-router-dom';
import { findAllByTestId } from '@testing-library/react';

//각 버튼들 (글 등록, )
const StyledButton=styled.button`
    border:none;
    margin:2px;
    background:none;
    height:30px;
    width:30px;
    padding-top:5px;
    background:none;
    color:#7D7D7D;
    font-weight:bold;
`;
//채팅 리스트 component 입니다.
const List=styled.div`
font-family:'KoddiUDOnGothic-Regular';
`;

//스크롤 할때 상단 고정
const PageStyled=styled.div`
    position: sticky;
    top: 0px;
    z-index: 1;
    background-color: white;
`;

const ChatList=()=>{
    const [showAddress, setShowAddress]=useState(''); //현재 사용자의 주소
    const [chatList,setChatList]=useState([]); //채팅 리스트
 
     // chatting목록입니다.
    const getChatting=async => {
        return axios.get("url", {
        params: {
        //코드
        // board:2, 
        }
    });
    };

    //채팅목록 가져오는 통신입니다
    useEffect(() => { 
        axios.all([getChatting(false)]) // axios.all로 여러 개의 request를 보내고
        .then(axios.spread(({chatResp}) => { // response를 spread로 받는다. 
            setChatList(chatResp.data.data);
            console.log(chatResp)
        })).catch((error) => {
            console.error(error)
        })}
    );

    return(
    <>
    <PageStyled>
    <p style={{fontSize:'16px', color:'#A352CC' ,fontWeight:'bolder', textAlign:'center'}}>채팅</p>
    <hr></hr>
    </PageStyled>
    <List>

    {chatList.map((data)=> { //채팅 목록
            return ( <Link to={`/Chatting/${data.no}`}>
                        <ChatListComponent
                        user={data.user}
                        content={data.content} 
                        address={data.address} 
                        read={data.read}
                        key={data.id}
                        />
                    </Link>   
                    );

    })}
   
    </List>
    </>
    );
};

export default ChatList;
export {StyledButton};