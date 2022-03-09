import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import axios from 'axios';
import { List, Avatar, Button, Skeleton, Rate } from 'antd';
import { useParams } from 'react-router';
import profile from './images/profile.png'
import styled from 'styled-components';

const StyledBtn = styled(Button)`
&:hover, &:focus {
  color:#A352CC;
  background-color:#ffffff;
  border:1px solid #A352CC;
}
`;

const ReviewList = () => {
  const count = 3;
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [curUser, setCurUser] = useState('');
  const { id } = useParams();
  const postId = id;

  useEffect(() => {
    axios.get('http://localhost:7000/review/list/id', { //통신을 위한 url을 적어주세요.
      params: {
        id: postId, //글을 클릭할때 게시글 아이디(postId)를 넘겨줘서 해당 아이디에 맞는 데이터 가져옴
      }
    })
      .then(res => {
        setInitLoading(false);
        setData(res.data);
        setList(res.data);
      }).catch((error) => {
        console.log(error);
      })
    axios.get("http://localhost:7000/auth", { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setCurUser(res.data);
        }
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(data.concat(
      [...new Array(count)].map(() => ({ loading: true })),
    ));
    axios.get('http://localhost:7000/review/list/id', { //통신을 위한 url을 적어주세요.
      params: {
        id: postId, //글을 클릭할때 게시글 아이디(postId)를 넘겨줘서 해당 아이디에 맞는 데이터 가져옴
      }
    })
      .then(res => {
        const newData = data.concat(res.data);
        setData(newData);
        setList(newData);
        setLoading(false);
      }).catch(error => {
        console.log(error)
      })
    window.dispatchEvent(new Event('resize'));
  };

  const loadMore =
    data.length > 3 ?
      (!(initLoading && loading) ?
        (<div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <StyledBtn onClick={onLoadMore}>빌린 후기 더보기</StyledBtn>
        </div>)
        : null)
      : null;

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={item => (
        //  현재 계정 접속자와 글쓴이 id 가 같으면 수정/삭제 버튼이 보입니다 
        <List.Item
          actions={item.nick === curUser.nick && [<Link to={`/review/edit/${item.id}`}>수정</Link>, <Link to={"list-loadmore-more"}>삭제</Link>]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={profile} />}
              title={
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 'bold' }}>{item.nick}</span>
                    <Rate allowHalf style={{ color: '#EBCAFD', fontSize: '16px', marginRight: '20px' }} disabled defaultValue={item.score} />
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
  );
}

export default ReviewList;