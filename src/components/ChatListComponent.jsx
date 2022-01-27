import React  from 'react';
import styled from "styled-components";

// 게시글 하나 전체를 묶는 div 태그의 스타일링
const Post=styled.div`
    border-bottom: solid 2px #E5E5E5;
    height:100px;
    width:95%;
    margin:auto;
    box-sizing: border-box;
    padding:15px;
    margin-bottom:5px;
    background:white;
    position:relative;
    &:hover { //게시글 위에 커서 올릴경우
        background:#E5E5E5;
    }
`;
//게시글 제일 상단(글 제목, 작성날짜) 스타일링
const PostHeader=styled.div`
    display: flex;
    justify-content:left;
    margin-bottom:-20px;
    margin-top:-20px;
`;
const PostRight = styled.div`
    display: flex;
    justify-content:right;
`;
// 게시글 제일 하단 (대여기간, 대여비) 스타일링
const PostFooter=styled.div`
    position:relative;
    // right:10px;
    top:-5px;
    font-size:18px;
    display: flex;
    justify-content:space-between;
`;

const ChatListComponent=({user, content, address, read})=>{
    return(
        <Post>
        <PostHeader>
        <p style={{
        fontSize:'22px', fontWeight:'bold', marginRight:'15px'}}>{user}</p>
        <p style={{
        fontSize:'15px', color: '#7D7D7D', marginTop: '27px'}}>{address}</p>
        </PostHeader>
        <PostRight>        
            <div style={{color:'#7D7D7D',
                fontSize:'12px'}}>{read}</div>
        </PostRight>

        <PostFooter>
            <div>{content}</div>
        </PostFooter>
        </Post>
    )
};

export default ChatListComponent