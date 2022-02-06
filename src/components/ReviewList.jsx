import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import moment from 'moment';
import 'moment/locale/ko';
import axios from 'axios';
import { List, Avatar, Button, Skeleton, Rate } from 'antd';
import {ReviewButton, PostHeader} from './ShowPost';
import { ArrowLeftOutlined } from '@ant-design/icons';
import profile from './images/profile.png'
import styled from 'styled-components';


const StyledBtn=styled(Button)`
&:hover, &:focus {
  color:#A352CC;
  background-color:#ffffff;
  border:1px solid #A352CC;
}
`;
const ReviewList=()=> {

    const count = 3;
    // const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
    const [initLoading,setInitLoading]= useState(true);
    const [loading,setLoading]=useState(false);
    const [data,setData]=useState([]);
    const [list,setList]=useState([]);

    //  rate: currentValue, //별점 
    //         content:reviewContent, //리뷰글 
    //시작할 때 실행
    useEffect(()=>{
        axios.get('url 넣어주세요')
          .then(res => {
            setInitLoading(false);
            setData(res.data);
            setList(res.data);
            }).catch((error)=>{
                console.log(error);
            })},[]);
    

    const onLoadMore = () => {
          setLoading(true);
          setList(data.concat(
            [...new Array(count)].map(() => ({ loading: true})),
          ));
        axios.get('url 넣어주세요')
          .then(res => {
            const newData=data.concat(res.data);
            setData(newData);
            setList(newData);
            setLoading(false);
          }).catch(error=>{
            console.log(error)
          })
                // Resetting window's offsetTop so:to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
          };
      
     
      const loadMore =
       !(initLoading &&loading) ?
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
          :null;

    return (
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          renderItem={item => (
            //  현재 계정 접속자와 글쓴이 id 가 같으면 수정/삭제 버튼이 보입니다 
            // 주석 풀어주세요!!!!!!!!1
          //  {postInfo.user.id===curUser.id&& 
            <List.Item
              actions={[<Link to={"list-loadmore-edit"}>수정</Link>, <Link to={"list-loadmore-more"}>삭제</Link>]}
            >
              {/* } */}
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={profile} />}
                  title={
                    <div>
                    <div style={{display:'flex', justifyContent:'space-between'}}> 
                  <span style={{fontWeight:'bold'}}>{item.reviewWriter}</span>  {/*item.reviewWriter:리뷰 쓴 사람*/}
                  <Rate style={{color:'#EBCAFD', fontSize:'16px', marginRight:'20px'}} disabled defaultValue={item.rate}  /> {/*item.rate: 별점*/}
                  </div>
                   <span style={{fontWeight:'normal', color:'#7D7D7D', fontSize:'12px'}}>{item.date}</span> {/*item.date: 리뷰 쓴 날짜*/}
                   </div>
                }
                  description={
                     item.content.split("\n").map((line) => {  //item.content: 리뷰 글 내용
                      return (
                        <div style={{color:'black', wordBreak:'break-all'}}>
                          {line}
                      </div>
                    );
                    })} 

                />
              </Skeleton>
            </List.Item>
          )}
          style={{marginBottom:'100px'}}
        />
    );
 }

 export default ReviewList;