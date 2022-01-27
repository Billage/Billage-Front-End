import React, {useState, useEffect} from 'react';
import BoardNav from './BoardNav';
import styled from "styled-components";
import axios from 'axios';
import PostComponent from './PostComponent';
import PostComponent2 from './PostComponent2';
import { Link } from 'react-router-dom';
import { findAllByTestId } from '@testing-library/react';

//이미지 태그 (각 버튼들에 들어가는 아이콘) 대신 쓰는 component입니다.
export const Img=styled.img`
max-width: 100%;
height:auto;
`;
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
//게시글 리스트 component 입니다.
const List=styled.div`
font-family:'KoddiUDOnGothic-Regular';
`;

//메뉴 스타일
const MenuStyled=styled.div`
    display:flex;
    justify-content:space-evenly;
    
`;

//스크롤 할때 상단 고정
const PageStyled=styled.div`
    position: sticky;
    top: 0px;
    z-index: 1;
    background-color: white;
`;

const Scrap=()=>{
    const [showAddress, setShowAddress]=useState(''); //현재 사용자의 주소
    const [searchText,setSearchText]=useState(''); //검색 input 창에 입력되는 text
    const [lendYouList,setLendYouList]=useState([]); //빌려줄게요 리스트. 백엔드에서 가져온 데이터 담는 배열
    const [borrowMeList,setBorrowMeList]=useState([]); //빌려주세요 리스트

    const [fontStyle1, setFontStyle1]=useState({color: "black", fontWeight:"bold"});
    const [fontStyle2, setFontStyle2]=useState({color: "gray"});
    const [lendBtn,setLendBtn]=useState(true); //현재 빌려줄게요 게시판인지 확인
    const [borrowBtn,setBorrowBtn]=useState(false); //현재 빌려주세요 게시판인지 확인
    const [search,setSearch]=useState(false); // 검색 버튼이 눌렸는지 확인하는 변수

    const [filteredPost,setFilteredPost]=useState([]); //검색한 post 를 담는 배열
    const onClickMenu1 = (e) => {e.preventDefault(); setFontStyle1({color: "black", fontWeight:"bold"}); setFontStyle2({color: "gray"}); 
    setLendBtn(true); setBorrowBtn(false); setSearch(false); };
    const onClickMenu2 = (e) => {e.preventDefault(); setFontStyle1({color: "gray"}); setFontStyle2({color: "black",  fontWeight:"bold"});
    setBorrowBtn(true);  setLendBtn(false); setSearch(false); };
    const [isLogined,setIsLogined]=useState(false);
    
    // 빌려줄게요 게시판 찜목록입니다.
    const getLendYou=async (loginChk) => {
        if(loginChk){ //로그인이 되어있는 상태에서는 사용자가 찜한 목록
        return axios.get("https://reqres.in/api/users?page=2", {//테스트용 url 입니다. 바꿔주세요.
                    params: {
                    //user 정보가 없어서 오류 나서 주석처리해놓았습니다. 아래주석 풀어주세요.
                    // user.showAddress:showAddress, //사용자와 같은 동 내에서 쓴 글만 보여줌
                    board:1, ////빌려줄게요 게시판 코드
                    }
                });
            }
        else{//로그인이 되어있지 않은 상태
                return axios.get("https://reqres.in/api/login", {//테스트용 url 입니다. 바꿔주세요.
                            params: {
                            board:1, //빌려줄게요 게시판 코드
                            }
                        });
        }
    };
     // 빌려주세요 게시판 찜목록입니다.
    const getBorrowMe=async (loginChk) => {
        if(loginChk){ //로그인이 되어있는 상태에서는 사용자가 찜한 목록 
        return axios.get("https://reqres.in/api/users?page=2", {//테스트용 url 입니다. 바꿔주세요.
        params: {
        //user 정보가 없어서 오류 나서 주석처리해놓았습니다. 아래주석 풀어주세요.
        // user.showAddress:showAddress, //사용자와 같은 동 내에서 쓴 글만 보여줌
        //여기에서 user는 게시판에 글쓴 사람이고, user.address는 그 게시자들의 주소를 말합니다.
        board:2, //빌려주세요 게시판 코드
        }
    });
    }
    else{ //로그인이 되어있지 않은 상태
        return axios.get("https://reqres.in/api/login", {//테스트용 url 입니다. 바꿔주세요.
        params: {
        board:2, //빌려주세요 게시판 코드
        }
    });       
    }
    };
     //로그인 상태를 확인하기 위한 통신입니다.
    useEffect(() => { //처음 페이지가 실행될 때, 로그인 상태바뀔때, 사용자 주소 바뀔때 실행됨
        axios.get("https://reqres.in/api/login") //로그인 상태를 확인하기 위한 통신 url 입력해주세요
        .then((response) => { //로그인한 상태일때
            setIsLogined(true); 
            return(
                //사용자 주소 가져오기
                axios.get("https://reqres.in/api/users?page=2") //현재 로그인한 사용자 정보 url 입력해주세요
                    .then((data) => {
                        setShowAddress(showAddress); //지금 로그인한 사용자 주소를 가져옵니다.
                    })
                    .catch( e => console.log(e))
            );
        })//로그인한 안한 상태일때
        .catch( e => {
            console.log(e);
            setIsLogined(false);
        });
     }, [isLogined, showAddress]); 

     //각 게시판의 글을 가져올때 사용하는 통신입니다.
    useEffect(() => {  //처음 페이지가 실행될 때, 로그인 상태바뀔때, 사용자 주소 바뀔때 실행됨
    if(!isLogined){ //로그인 하지 않은 상황에서는 아무글도 안보임 
    axios.all([getLendYou(false),getBorrowMe(false)]) // axios.all로 여러 개의 request를 보내고
    .then(axios.spread(({lendScrapResp}, {borrowScrapResp}) => { // response를 spread로 받는다. 
        //lendScrapResp: 빌려줄게요 게시판 찜목록 / borrowScrapResp: 빌려주세요 게시판 찜목록
        setLendYouList(lendScrapResp.data.data);
        console.log(lendScrapResp);
        setBorrowMeList(borrowScrapResp.data.data);
        console.log(borrowScrapResp)
    })).catch((error) => {
        console.error(error)
    })}
    else if(isLogined){//로그인 한 상황에서는 사용자가 찜한 목록 
        axios.all([getLendYou(true),getBorrowMe(true)]) // axios.all로 여러 개의 request를 보내고
        .then(axios.spread(({lendScrapResp}, {borrowScrapResp}) => { // response를 spread로 받는다. 
            //lendScrapResp: 빌려줄게요 게시판 찜목록 / borrowScrapResp: 빌려주세요 게시판 찜목록
            setLendYouList(lendScrapResp.data.data);
            console.log(lendScrapResp);
            setBorrowMeList(borrowScrapResp.data.data);
            console.log(borrowScrapResp)
        })).catch((error) => {
            console.error(error)
        })
    }
    }, [isLogined, showAddress]);
        
    //아래 코드는 주석 풀지 않으셔도 됩니다.
    // 현재주소 받기 
    // useEffect(() => { //처음 페이지가 실행될 때만 실행된다
    //     axios.get("url") //통신하기 위한 url 을 입력해주세요
    //     .then((data) => {
    //         setShowAddress(data.showAddress);
    //     })
    //     .catch( e => console.log(e));
    //  }, []);

    const searchChange=(e)=>{//검색창에 text 입력했을 때 입력한 text를 검색 text에 넣어줌
        setSearchText(e.target.value);
    };
    const btnClick=()=>{ //검색창 버튼 클릭했을 때 뜨는 버튼
        //filtered: 검색 결과 게시물들이 담기는 배열
    if(lendBtn){
    const filtered = lendYouList.filter((post) =>
        post.email.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    );
    setFilteredPost(filtered);
    console.log(filtered);
    }
    else{
    const filtered = borrowMeList.filter((post) =>
    post.email.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    );
    setFilteredPost(filtered);
    console.log(filtered);
    }
    setSearchText('');
    setSearch(true);

    };
    const onKeyPress=(e)=>{
        if(e.key ==='Enter'){
            btnClick();
        }
    };
    return(
    <>
   {/* <BoardNav showAddress={showAddress} login={isLogined} boardName="게시판" />     */}
    <PageStyled>
        <br/>
{/* 
        <SearchBox>
        <Input value={searchText} onChange={searchChange} onKeyPress={onKeyPress}/>
        {searchText&&<StyledButton onClick={btnClick} color="#E5E5E5"><Img src="img/search.png" alt="검색"/></StyledButton>}
        </SearchBox> */}
        <p style={{fontSize:'16px', color:'#A352CC' ,fontWeight:'bolder', textAlign:'center', marginTop:'-5px'}}>내가 찜한 물품</p>
        <br/>
        
        <MenuStyled>
        <a href="/" onClick={onClickMenu1} style={fontStyle1}>빌려줄게요</a>
        <a href="/" onClick={onClickMenu2} style={fontStyle2}>빌려주세요</a>
        </MenuStyled>
        <hr></hr>
    </PageStyled>
    <List>
    {(!search&&lendBtn)&&lendYouList.map((data) => { //빌려줄게요 게시판(default)
                return ( <Link to={`/ShowPost/${data.no}`}>
                    <PostComponent2
                        image={data.image}
                        title={data.title}
                        postDate={data.postDate} 
                        writerAddress={data.user.showAddress} 
                        startDate={data.startDate}
                        endDate={data.endDate}
                        cost={data.cost}
                        key={data.id}
                        />
                        </Link>
                    );
                    
                //아래는 테스트용 더미 데이터입니다. 필요없다면 지워주세요.
                // return (<PostComponent2
                //     image={data.avatar}
                //     title={data.first_name}
                //     postDate="2021/08/19"
                //     writerAddress="등촌3동" 
                //     startDate="8/12"
                //     endDate="8/30"
                //     cost="20,000"
                //     key={data.id}
                //     />
                // );
                })}
    {(search&&lendBtn)&&filteredPost.map((data)=>{ //빌려줄게요 게시판에서 검색한 경우 나오는 post
                      return (<Link to={`/ShowPost/${data.no}`}>
                        <PostComponent2
                        image={data.image}
                        title={data.title}
                        postDate={data.postDate} 
                        writerAddress={data.user.showAddress}  
                        startDate={data.startDate}
                        endDate={data.endDate}
                        cost={data.cost}
                        key={data.id}
                        /></Link>
                    );
                    //아래는 테스트용 더미 데이터입니다. 필요없다면 지워주세요.
                    // return (<PostComponent2
                    //     image={data.avatar}
                    //     title={data.first_name}
                    //     postDate="2021/08/19"
                    //     writerAddress="강서구 등촌3동" 
                    //     startDate="8/12"
                    //     endDate="8/30"
                    //     cost="20,000"
                    //     key={data.id}
                    //     />
                    // );
    })}
    {(!search&&borrowBtn)&&borrowMeList.map((data)=> { //빌려주세요 게시판(default)
            return ( <Link to={`/ShowPost/${data.no}`}>
                        <PostComponent
                        title={data.title}
                        postDate={data.postDate} 
                        writerAddress={data.user.showAddress} 
                        startDate={data.startDate}
                        endDate={data.endDate}
                        cost={data.cost}
                        key={data.id}
                        />
                    </Link>   
                    );
            //아래는 테스트용 더미 데이터입니다. 필요없다면 지워주세요.
            // return (<PostComponent
            //     title={data.email}
            //     postDate="2021/08/19"
            //     writerAddress="미추홀구 용현동" 
            //     startDate="8/12"
            //     endDate="8/30"
            //     cost="20,000"
            //     key={data.id}
            //     />
            // );
            
    })}
     {(search&&borrowBtn)&&filteredPost.map((data)=>{ //빌려주세요 게시판에서 검색한 경우 나오는 post
            return (<Link to={`/ShowPost/${data.no}`}>
                <PostComponent
                title={data.title}
                postDate={data.postDate} 
                writerAddress={data.user.showAddress} 
                startDate={data.startDate}
                endDate={data.endDate}
                cost={data.cost}
                key={data.id}
                />
                </Link>
            );
            //아래는 테스트용 더미 데이터입니다. 필요없다면 지워주세요.
            // return (<PostComponent
            //     title={data.email}
            //     postDate="2021/08/19"
            //     writerAddress="미추홀구 용현동" 
            //     startDate="8/12"
            //     endDate="8/30"
            //     cost="20,000"
            //     key={data.id}
            //     />
            // );
    })}
    </List>
    </>
    );
};

export default Scrap;
export {StyledButton};