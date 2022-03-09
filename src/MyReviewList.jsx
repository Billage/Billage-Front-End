import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import PostComponent from './PostComponent';
import PostComponent2 from './PostComponent2';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { List, Avatar, Button, Skeleton, Rate } from 'antd';
import { useParams } from 'react-router';
import profile from './images/profile.png';
import { findAllByTestId } from '@testing-library/react';

//이미지 태그 (각 버튼들에 들어가는 아이콘) 대신 쓰는 component입니다.
export const Img = styled.img` 
    max-width: 100%;
    height:auto;
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

const MyReviewList = () => {
  const [showAddress, setShowAddress] = useState(''); //현재 사용자의 주소
  const [lendYouList, setLendYouList] = useState([]); //빌려줄게요 리스트. 백엔드에서 가져온 데이터 담는 배열

  const [isLogined, setIsLogined] = useState(false);

  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const { id } = useParams();
  const postId = id;

  // 빌려줄게요 게시판 - 내가 쓴 리뷰 목록입니다.
  const getLendYou = async (loginChk) => {
    if (loginChk) { //로그인이 되어있는 상태에서는 사용자가 쓴 글  목록
      return axios.get("https://reqres.in/api/users?page=2", {//테스트용 url 입니다. 바꿔주세요.
        params: {
          //user 정보가 없어서 오류 나서 주석처리해놓았습니다. 아래주석 풀어주세요. 
          // user.showAddress:showAddress, //사용자와 같은 동 내에서 쓴 글만 보여줌 
          board: 1, ////빌려줄게요 게시판 코드  
        }
      });
    }
    else {//로그인이 되어있지 않은 상태 
      return axios.get("https://reqres.in/api/login", {//테스트용 url 입니다. 바꿔주세요. 
        params: {
          board: 1, //빌려줄게요 게시판 코드
        }
      });
    }
  };

  //로그인 상태를 확인하기 위한 통신입니다. 
  useEffect(() => { //처음 페이지가 실행될 때, 로그인 상태바뀔때, 사용자 주소 바뀔때 실행됨
    axios.get("https://reqres.in/api/login") //로그인 상태를 확인하기 위한 통신 url 입력해주세요
      .then((response) => { //로그인한 상태일때
        setIsLogined(true);
        return (
          //사용자 주소 가져오기
          axios.get("https://reqres.in/api/users?page=2") //현재 로그인한 사용자 정보 url 입력해주세요
            .then((data) => {
              setShowAddress(showAddress); //지금 로그인한 사용자 주소를 가져옵니다.
            })
            .catch(e => console.log(e))
        );
      })//로그인한 안한 상태일때
      .catch(e => {
        console.log(e);
        setIsLogined(false);
      });
  }, [isLogined, showAddress]);


  //리뷰 목록을 가져올때 사용하는 통신입니다.
  useEffect(() => {  //처음 페이지가 실행될 때, 로그인 상태바뀔때, 사용자 주소 바뀔때 실행됨
    if (!isLogined) { //로그인 하지 않은 상황에서는 아무글도 안보임 
      axios.all([getLendYou(false)]) // axios.all로 여러 개의 request를 보내고
        .then(axios.spread(({ lendReviewResp }) => { // response를 spread로 받는다. 
          //lendReviewResp: 빌려줄게요 게시판 - 리뷰 글 목록
          setLendYouList(lendReviewResp.data.data);
          console.log(lendReviewResp);

        })).catch((error) => {
          console.error(error)
        })
    }
    else if (isLogined) {//로그인 한 상황에서는 사용자가 쓴 리뷰 목록 
      axios.all([getLendYou(true)]) // axios.all로 여러 개의 request를 보내고 
        .then(axios.spread(({ lendReviewResp }) => { // response를 spread로 받는다. 
          //lendReviewResp: 빌려줄게요 게시판 - 리뷰 글 목록
          setLendYouList(lendReviewResp.data.data);
          console.log(lendReviewResp);

        })).catch((error) => {
          console.error(error)
        })
    }
  }, [isLogined, showAddress]);

  return (
    <>
      {/* <BoardNav showAddress={showAddress} login={isLogined} boardName="게시판" />     */}
      <PageStyled>
        <br />
        <p style={{ fontSize: '16px', color: '#A352CC', fontWeight: 'bolder', textAlign: 'center', marginTop: '-5px' }}>내가 쓴 후기</p>
        <hr></hr>
      </PageStyled>
      <List>
        {lendYouList.map((data) => { //빌려줄게요 게시판 - 리뷰목록(default) 
          return (
            <Link to={`/ShowPost/${data.no}`}>
              <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                dataSource={list}
                renderItem={item => (
                  //  현재 계정 접속자와 글쓴이 id 가 같으면 수정/삭제 버튼이 보입니다 
                  //  {postInfo.user.id===curUser.id &&  
                  <List.Item>
                    {/* } */}
                    <Skeleton avatar title={false} loading={item.loading} active>
                      <List.Item.Meta
                        avatar={<Avatar src={profile} />}
                        title={
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ fontWeight: 'bold' }}>{item.nick}</span>
                              <Rate style={{ color: '#EBCAFD', fontSize: '16px', marginRight: '20px' }} disabled defaultValue={item.score} />
                            </div>
                            <span style={{ fontWeight: 'normal', color: '#7D7D7D', fontSize: '12px' }}>{item.date}</span>
                          </div>
                        }
                        description={
                          item.body.split("\n").map((line) => {  //item.content: 리뷰 글 내용
                            return (
                              <div style={{ color: 'black', wordBreak: 'break-all' }}>
                                {line}
                              </div>
                            );
                          })}
                      />
                    </Skeleton>
                  </List.Item>
                )}
                style={{ marginBottom: '100px' }}
              />
            </Link>
          );
        })}
      </List>
    </>
  );
};

export default MyReviewList;