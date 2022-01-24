import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Rate, Input } from 'antd';
import {ReviewButton, PostHeader} from './ShowPost';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const ReviewWrite=()=> {
    const [reviewContent,setReviewContent]=useState('');
    const [currentValue, setCurrentValue] = useState(0);
    const history = useHistory();
    console.log(reviewContent);
    console.log(currentValue);

    const submitBtn=(e)=>{
      if(!currentValue){
        alert('별점을 눌러주세요.')
      }
      else if(!reviewContent){
        alert('평가를 남겨주세요.')
      }
      else {
        const data = {
          rate: currentValue,
          content: reviewContent
        };
        console.log(data);
        axios.post('url', data)
          .then( (res) => {
            //기존 post 화면으로 이동 
          })
          .catch( (error)=> {
            console.log(error);
          });
        }
    };
    return (
    <>
      <PostHeader style={{border:'none', padding:'12px'}}>
      <ArrowLeftOutlined style={{fontSize:'20px', marginTop:'3px'}} onClick={() => history.goBack()}/>
        <h1 style={{fontWeight:'bold', fontSize:'16px', position:'absolute',left:'80px', top:'12px'}}>대여후기 작성</h1>
        <ReviewButton onClick={submitBtn} style={{display:'inline-block', fontSize:'12px',height:'25px', textAlign:'center'}}type="primary">완료</ReviewButton>    
      </PostHeader>
      <PostHeader style={{flexDirection:'column', alignItems:'center'}}>
      <Rate allowHalf onChange={(value) => {
        setCurrentValue(value)
      }}  value={currentValue} style={{color:'#EBCAFD', fontSize:'30px'}}/> <br />
     
      <p style={{position:'relative',top:'-15px',color:'#7D7D7D', fontSize:'10px', fontWeight:'bolder'}}>별을 탭하여 평가해주세요</p>
      </PostHeader>
      <TextArea onPressEnter={submitBtn} onChange={(e) => setReviewContent(e.target.value)}value={reviewContent} placeholder="당신의 경험을 이웃에게 공유해주세요" autoSize={true} bordered={false} />
      </>
    );
  }
//  Current Rating: {currentValue} 
export default ReviewWrite;
// #EBCAFD 연한 보라색
