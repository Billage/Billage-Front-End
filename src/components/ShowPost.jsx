import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import axios from 'axios';
import 'antd/dist/antd.css';
import { Tabs, Button } from 'antd';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import ReviewList from './ReviewList';
import LikeButton from './LikeButton';
const { TabPane } = Tabs;

// 이미지 슬라이더 감싸는 div
const ImgWrapper=styled.div` 
    // overflow:hidden;
    // overflow-y:hidden;
    text-align:center;
    height:300px;
    width:100%;
    position:relative;
    // transform : translateY(-100%);
    background: ${props => props.arrLength===0 ? '#E5E5E5' : 'none'};
`;
//이미지 하나하나 스타일링
const PostImg=styled.img`
    box-sizing: border-box;
    height:100%;
    width:100%;
    // display:inline-block;
`;
//슬라이더 양옆으로 옮기는 버튼
const SlideBtn=styled.button`
    position:absolute;
    top:150px;
    ${props=>props.name==='left'?'left:10px;':'right:10px'};
    border:none;
    border-radius:50%;
    width:35px;
    height:35px;
    font-size:20px;
    color:white;
    opacity:0.5; 
    background-color:black;
`;
//
const PostHeader=styled.div`
    display:flex;
    justify-content:space-between;
    border-bottom: solid 2px #E5E5E5;
    margin:10px 0 5px 0;
    padding: 2px;
    position:relative;
    height:40px;
   text-align:center;
`;

const PostFooter=styled.div`
    background:white;
    display:flex;
    justify-content:space-between;
    height:50px;
    align-items:center;
    position:fixed;
    bottom:0;
    width:90%;
`;
const PostComponent=styled.div`
    width:90%;
    height:50%;
    overflow:auto;
    margin:auto;
    position:relative;
`;
const PostTitle=styled.div`
    display:flex;
    justify-content:space-between;
`;
const ChatButton=styled.button`
    background:#A352CC;
    color:white;
    border:none;
    width:110px;
    height:30px;
    font-size:16px;
    text-align:center;
`;
const HighLight=styled.div`
    color:#A352CC;
    font-size:20px;
    font-weight:bold;
    
    background-color:white;
`;
const PostButton=styled.button`
    border:none;
    background:none;
    color: #7D7D7D;
    font-size:12px;
`;
const PostContent=styled.div`
    font-size:16px; 
    margin-top:3px; 
    position:relative;
    margin-bottom:15%;
`;
const ImgTurn=styled.div`
    background:black;
    width:50px;
    height:20px;
    position:absolute;
    bottom:0;
    left:46%;
    border-radius:2px;
    margin:5px;
    color:white;
    font-size:12px;
    opacity:0.5;
    text-align:center;
`;
const ReviewButton=styled(Button)`
    background-color:#ffffff;
    border:1px solid #E5E5E5;
    color:#A352CC;
    &:hover, &:focus {
        color:#A352CC;
        background-color:#ffffff;
        border:1px solid #A352CC;
    }
    height:28px;
    text-align:center;
    font-size:12px;
`;
const ChatButton2=styled(Button)`
    background-color:#A352CC;
    border:1px solid #ffffff;
    color:#ffffff;
    &:hover, &:focus {
        color:#A352CC;
        background-color:#ffffff;
        border:1px solid #A352CC;
    }
`;
const StyledTab=styled(Tabs)`
    size:large;
   
    
`;

    const ShowPost=({postId})=>{
    const [imgArr,setImgArr]=useState([]); //이미지를 넣는 배열 
    const [postInfo,setPostInfo]=useState(''); //이미지 제외 게시글 정보
    let [imgIdx,setImgIdx]=useState(0); //이미지 슬라이더에서 사진 교체할 때 사용하는 인덱스 넘버
    const [curUser,setCurUser]=useState('') //현재 계정에 접속해 서비스를 사용하는 사용자
    const [temp,setTemp]=useState('안녕하세요 \n 빔프로젝터 빌려가실 분을 찾습니다 안녕하세요 \n 빔프로젝터 빌려가실 분을 찾습니다 안녕하세요 \n 빔프로젝터 빌려가실 분을 찾습니다안녕하세요 \n 빔프로젝터 빌려가실 분을 찾습니다안녕하세요 \n 빔프로젝터 빌려가실 분을 찾습니다안녕하세요 \n 빔프로젝터 빌려가실 분을 찾습니다안녕하세요 \n 빔프로젝터 빌려가실 분을 찾습니다안녕하세요 \n 빔프로젝터 빌려가실 분을 찾습니다안녕하세요 \n 빔프로젝터 빌려가실 분을 찾습니다 안녕하세요 \n 빔프로젝터 빌려가실 분을 찾습니다 안녕하세요 \n 빔프로젝터 빌려가실 분을 찾습니다  안녕하세요 \n 빔프로젝터 빌려가실 분을 찾습니다 안녕하세요 \n 빔프로젝터 빌려가실 분을 찾습니다 ')
    // const getPostContent=(postId)=>{
    // return axios.get(url, { //통신을 위한 url을 적어주세요.
    //         params: {
    //         id:postId, //글을 클릭할때 게시글 아이디(postId)를 넘겨줘서 해당 아이디에 맞는 데이터 가져옴
    //         }
    //     });
    // };
    // const getPostImg=(postId)=>{ //통신을 위한 url을 적어주세요.
    //     return axios.get(url, {
    //         params: {
    //         id:postId, //글을 클릭할때 게시글 아이디(postId)를 넘겨줘서 해당 아이디에 맞는 데이터 가져옴
    //         }
    //     });
    // };
    // useEffect((postId) => {  //페이지가 실행될 때 한 번만 실행된다
    // axios.all([getPostContent(postId),getPostImg(postId)]) // axios.all로 여러 개의 request를 보내고
    // .then(axios.spread((contentResp, imgResp) => { // response를 spread로 받는다
    //     //contentResp: 이미지를 제외한 게시물 정보 데이터 / imgResp: 이미지 데이터
    //     setPostInfo(contentResp); 
    //     setImgArr(imgResp);
    // })).catch((error) => {
    //     console.error(error)
    // })
    // }, []);
    const numberWithCommas=(x)=> {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
   
    const onClickSlide=(e)=>{
    if(e.target.name==='right'&&imgArr.length-1!==imgIdx){
        setImgIdx(imgIdx+1);
       console.log(e.target.name);
    }//슬라이더 오른쪽 버튼 누르면, 마지막 인덱스가 아닌지 확인후 다음 인덱스의 이미지 가져옴
    else if(e.target.name==='left'&&imgIdx>0){
        setImgIdx(imgIdx-1);
        console.log(e.target.name);
    }//슬라이더 왼쪽 버튼 누르면, 처음 인덱스가 아닌지 확인후 이전 인덱스의 이미지 가져옴
    };

    //채팅 보내기 버튼 눌렀을 때 
    const onClickChat = () => {
        window.location.href = "/Chatting";

        //닉네임 보내기 
        axios.post('url', {
            nick: postInfo.user.nick,
        }
        ).then( (res) => {
            console.log(res);
        })
        .catch( (error)=> {
            console.log(error);
        });

    }
    useEffect(()=>{
        axios.get("http://localhost:7000/auth", { withCredentials: true })
        .then((res)=>{
            if(res.data){
                setCurUser(res.data);
            }
        }).catch((error)=>{
            console.log(error);
        }

        );
    },[]);
     //찜 버튼 
     const onLikeSubmit = (check) => {
    	console.log(check);
       let ans = {
        postId: postId,
        // nick: postInfo.user.nick,
        check: check
        }
        axios.post('url', ans)
            //성공
            .then((res)=>{
                console.log(res);
            })
            //에러
            .catch(error=>{
                console.log(error);
            });

    }
    return(
        <div style={{background: 'white'}}>
        <ImgWrapper arrLength={imgArr.length}>
        {/* 이미지가 하나라도 있으면, 아래 wrapper 안의 코드가 보이고 이미지가 하나도 없으면 회색 바탕 */}
        {imgArr.length!==0&&<PostImg src={imgArr[imgIdx].url} alt={imgArr[imgIdx].name}/>}
        {imgArr.length!==0&&<SlideBtn name="right" onClick={onClickSlide}>»</SlideBtn> /* 슬라이더 오른쪽 버튼*/}
        {imgArr.length!==0&&<SlideBtn name="left" onClick={onClickSlide}>«</SlideBtn> /* 슬라이더 왼쪽 버튼*/}
        {imgArr.length!==0&&<ImgTurn><span style={{opacity:'1.0'}}>{imgIdx+1} / {imgArr.length}</span></ImgTurn>}
        </ImgWrapper>
        <PostComponent>
        <PostHeader>
            <div>
            <div style={{fontWeight:'bold', fontSize:'14px'}}>
                {/* {postInfo.user.nick}  */}
                글쓴이 닉네임
                </div>
            <div style={{color:'#7D7D7D', fontSize:'11px'}}>
                {/* {postInfo.user.showAddress}  */}
                글쓴이 주소
                </div>
            </div>
            <HighLight> 
                {postInfo.startDate} - {postInfo.endDate}
            </HighLight> 
            {/* 대여기간 */}
        </PostHeader>
       
        <StyledTab type={{line:'300px'}} defaultActiveKey="1" centered>
        <TabPane tab="본문 내용" key="1">
        <PostTitle>
        <div style={{fontWeight:'bold', fontSize:'18px', marginTop:'2px'}}>
            {/* {postInfo.title}  */}
            게시글 제목 
        </div>
        {/* 현재 계정 접속자와 글쓴이 id 가 같으면 수정/삭제 버튼이 보입니다 */}
        {/* {postInfo.user.id===curUser.id&& */}
        <div>
   
        <Link to={`/Update/${postInfo.id}`}><PostButton>수정</PostButton></Link>
        {/* <Link to={`/Update/1`}><PostButton>수정</PostButton></Link> */}
        
        <PostButton>삭제</PostButton>
        </div>
        {/* } */}
        </PostTitle>
            <div style={{color:'#7D7D7D',fontSize:'12px', margin:'2px 0 0 2px'}}>{postInfo.createAt}</div> {/* 글쓴 날짜 및 시각 */}
        <PostContent>  
        {/* 게시글 보이는 곳*/} 
        {/* 게시글 줄 띄어쓰기되는 코드입니다 */}
        {/* 관련사항은 링크 참조해주세요 : https://coding-hwije.tistory.com/58 */}
     {/* {postInfo.body.split("\n").map((line) => { //postInfo.body: 글내용
            return (
              <span>
                {line}
                <br />
              </span>
            );
          })} */}
           {temp.split("\n").map((line) => { //postInfo.body: 글내용
            return (
              <span>
                {line}
                <br />
              </span>
            );
          })}
        {/* {postInfo.body}  */}
        </PostContent>
        </TabPane>
        <TabPane tab="대여 후기" key="2"> 
        <PostHeader style={{border:'none',margin:'0', padding:'0'}}>
        <ReviewButton postId={postId} style={{ position:'absolute',left:'5px'}}type="primary">후기 작성</ReviewButton>
      </PostHeader>
        {/* 리뷰글 리스트 */}
          <ReviewList />
        </TabPane>
         </StyledTab>
        
        <PostFooter>
            <HighLight style={{background:'white'}}>
                {/* {numberWithCommas(postInfo.price)} */}
                원</HighLight> {/* 제품 가격*/}
                <div style={{'display':'flex', 'marginTop':'5px'}}>
            {/* 게시글 찜 */}
            <LikeButton onSubmit={onLikeSubmit}/>

            {/* 채팅 */}
            <ChatButton2 onClick={onClickChat}>쪽지 보내기</ChatButton2>
            </div>
        </PostFooter>
      
        
        </PostComponent>
        
        </div>
    );
};
export default ShowPost;
export {ReviewButton, PostHeader};