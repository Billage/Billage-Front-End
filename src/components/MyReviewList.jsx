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
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7000/review/list', { withCredentials: true })
      .then((res) => {
        setList(res.data)
      })
      .catch((err) => {
      })
  }, [])

  return (
    <>
      <PageStyled>
        <br />
        <p style={{ fontSize: '16px', color: '#A352CC', fontWeight: 'bolder', textAlign: 'center', marginTop: '-5px' }}>내가 쓴 후기</p>
      </PageStyled>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[<Link to={"list-loadmore-edit"}>수정</Link>, <Link to={"list-loadmore-more"}>삭제</Link>]}
          >
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
                  item.body.split("\n").map((line) => {
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
    </>
  );
};

export default MyReviewList;