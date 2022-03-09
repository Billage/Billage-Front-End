import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import PostComponent from './PostComponent';
import PostComponent2 from './PostComponent2';
import { Link } from 'react-router-dom';

//이미지 태그 (각 버튼들에 들어가는 아이콘) 대신 쓰는 component입니다.
export const Img = styled.img`
max-width: 100%;
height:auto;
`;
//각 버튼들 (글 등록, )
const StyledButton = styled.button`
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
//게시글 리스트 component 입니다.
const List = styled.div`
font-family:'KoddiUDOnGothic-Regular';
`;
//메뉴 스타일
const MenuStyled = styled.div`
    display:flex;
    justify-content:space-evenly;
`;
//스크롤 할때 상단 고정
const PageStyled = styled.div`
    position: sticky;
    top: 0px;
    z-index: 1;
    background-color: white;
`;

const WriteList = () => {
    const [lendYouList, setLendYouList] = useState([]); //빌려줄게요 리스트. 백엔드에서 가져온 데이터 담는 배열
    const [borrowMeList, setBorrowMeList] = useState([]); //빌려주세요 리스트
    const [fontStyle1, setFontStyle1] = useState({ color: "black", fontWeight: "bold" });
    const [fontStyle2, setFontStyle2] = useState({ color: "gray" });
    const [lendBtn, setLendBtn] = useState(true); //현재 빌려줄게요 게시판인지 확인
    const [borrowBtn, setBorrowBtn] = useState(false); //현재 빌려주세요 게시판인지 확인

    const onClickMenu1 = (e) => {
        e.preventDefault(); setFontStyle1({ color: "black", fontWeight: "bold" }); setFontStyle2({ color: "gray" });
        setLendBtn(true); setBorrowBtn(false);
    };
    const onClickMenu2 = (e) => {
        e.preventDefault(); setFontStyle1({ color: "gray" }); setFontStyle2({ color: "black", fontWeight: "bold" });
        setBorrowBtn(true); setLendBtn(false);
    };
    // 빌려줄게요 게시글 가져오기
    const getLendYou = () => {
        return axios.get("http://localhost:7000/post/lend", { withCredentials: true })
    };
    // 빌려주세요 게시글 가져오기
    const getBorrowMe = () => {
        return axios.get("http://localhost:7000/post/borrow", { withCredentials: true })
    };
    //각 게시판의 글을 가져올때 사용하는 통신입니다.
    useEffect(() => {  //처음 페이지가 실행될 때, 로그인 상태바뀔때, 사용자 주소 바뀔때 실행됨
        axios.all([getLendYou(), getBorrowMe()]) // axios.all로 여러 개의 request를 보내고
            .then(axios.spread((lendResp, borrowResp, user) => { // response를 spread로 받는다. 
                setLendYouList(lendResp.data);
                setBorrowMeList(borrowResp.data);
            }))
            .catch((error) => {
                console.error(error)
            })
    }, []);

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <>
            {/* <BoardNav showAddress={showAddress} login={isLogined} boardName="게시판" />     */}
            <PageStyled>
                <br />
                <p style={{ fontSize: '16px', color: '#A352CC', fontWeight: 'bolder', textAlign: 'center', marginTop: '-5px' }}>내가 쓴 글</p>
                <br />

                <MenuStyled>
                    <a href="/" onClick={onClickMenu1} style={fontStyle1}>빌려줄게요</a>
                    <a href="/" onClick={onClickMenu2} style={fontStyle2}>빌려주세요</a>
                </MenuStyled>
                <hr></hr>
            </PageStyled>
            <List>
                {lendBtn && lendYouList.map((data) => { //빌려줄게요 게시판(default)
                    return (<Link to={`post/${data.id}`}>
                        <PostComponent2
                            image={data.url.split('[---]')[0]}
                            title={data.title}
                            postDate={data.date}
                            writerAddress={data.address}
                            startDate={data.startDate}
                            endDate={data.endDate}
                            cost={numberWithCommas(Number(data.price))}
                            key={data.id}
                        />
                    </Link>
                    );
                })}

                {borrowBtn && borrowMeList.map((data) => { //빌려주세요 게시판(default)
                    return (<Link to={`post/${data.id}`}>
                        <PostComponent
                            title={data.title}
                            postDate={data.date}
                            writerAddress={data.address}
                            startDate={data.startDate}
                            endDate={data.endDate}
                            cost={numberWithCommas(Number(data.price))}원
                            key={data.id}
                        />
                    </Link>
                    );
                })}
            </List>
        </>
    );
};

export default WriteList;
export { StyledButton };