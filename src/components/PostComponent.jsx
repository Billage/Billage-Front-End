import React from 'react';
import styled from "styled-components";

// 게시글 하나 전체를 묶는 div 태그의 스타일링
const Post = styled.div`
    border-bottom: solid 2px #E5E5E5;
    border-radius:20px;
    // height:120px;
    width:95%;
    margin:auto;
    height:auto;
    box-sizing: border-box;
    padding:15px;
    padding-bottom:20px;
    margin-bottom:5px;
    background:white;
    position:relative;
    &:hover { //게시글 위에 커서 올릴경우
        background:#E5E5E5;
    }
`;
//게시글 제일 상단(글 제목, 작성날짜) 스타일링
const PostHeader = styled.div`
    display: flex;
    justify-content:space-between;
    margin-bottom:3px;
`;
// 게시글 제일 하단 (대여기간, 대여비) 스타일링
const PostFooter = styled.div`
    position:relative;
    // right:10px;
    top:20px;
    color:#A352CC;
    font-weight: bold;
    display: flex;
    justify-content:space-between;
`;

// [변수 이름]
// title: 게시글 제목
// postDate: 게시글 작성날짜/시간
// writerAddress: 작성자 주소
// startDate: 대여기간 시작날
// endDate: 대여기간 마지막날
// cost: 대여비용

const PostComponent = ({ title, postDate, writerAddress, startDate, endDate, cost, size }) => {
    return (
        <Post>
            <PostHeader>
                <div style={{ fontSize: (size === 'normal' ? '18px' : '14px'), fontWeight: 'bold', color: 'black' }}>{title}</div>
                <div style={{
                    color: '#7D7D7D',
                    fontSize: (size === 'normal' ? '12px' : '6px')
                }}>{postDate}</div>
            </PostHeader>
            <div style={{
                color: '#7D7D7D',
                fontSize: (size === 'normal' ? '12px' : '8px'), fontWeight: 'bold', 'text-align': 'left'
            }}>{writerAddress}</div>
            <PostFooter>
                <div style={{ fontSize: (size === 'normal' ? '16px' : '12px') }}>{`${startDate} - ${endDate}`}</div>
                <div style={{ fontSize: (size === 'normal' ? '18px' : '14px') }}>{cost}원</div>
            </PostFooter>
        </Post>
    )
};

export default PostComponent