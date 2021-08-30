import React, {useState, useEffect} from 'react';
import BoardNav from './BoardNav';
import styled from "styled-components";
import axios from 'axios';
import PostComponent from './PostComponent';
import PostComponent2 from './PostComponent2';

//검색박스 전체 (회색 둥글둥글 모양) 스타일링입니다.
const SearchBox=styled.div`

    position:relative;
    background-color:#E5E5E5;
    border-radius:20px;
    margin:-15px 15px 10px 15px;
    padding:5px 5px 5px 20px;
    height:25px;
    display:flex;
    align-items:center;
    justify-content:flex-end;

    `;
//위의 검색박스 내의 input 창 스타일링입니다.
const Input=styled.input`
    width:95%;
    outline:none;
    border:none;
    border-radius:20px;
    height:25px;
    background:none;
`;

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

const MainBoards=()=>{
    const [showAddress, setShowAddress]=useState('##동'); //현재 사용자의 주소
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

    const getLendYou=async () => {
        return axios.get("https://reqres.in/api/users?page=2"); //테스트용 url 입니다. 바꿔주세요.
    };
    const getBorrowMe=async () => {
        return axios.get("https://reqres.in/api/users?page=2"); //테스트용 url 입니다. 바꿔주세요.
    };

    useEffect(() => {  //처음 페이지가 실행될 때만 실행된다
    axios.all([getLendYou(),getBorrowMe()]) // axios.all로 여러 개의 request를 보내고
    .then(axios.spread((lendResp, borrowResp) => { // response를 spread로 받는다. 
        //lendResp: 빌려줄게요 게시판 post / borrowResp: 빌려주세요 게시판 post
        setLendYouList(lendResp);
        console.log(lendResp);
        setBorrowMeList(borrowResp);
        console.log(borrowResp)
    })).catch((error) => {
        console.error(error)
    })
    }, []);
    // 현재주소 받기
    useEffect(() => { //처음 페이지가 실행될 때만 실행된다
        axios.get("url") //통신하기 위한 url 을 입력해주세요
        .then(({ address }) => {
            setShowAddress(address);
        })
        .catch( e => console.log(e));
     }, []);

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

    return(
    <>
   <BoardNav showAddress={showAddress} boardName="게시판" />    
    <PageStyled>
        <br/>
        <SearchBox>
        <Input value={searchText} onChange={searchChange}/>
        {searchText&&<StyledButton onClick={btnClick} color="#E5E5E5"><Img src="img/search.png" alt="검색"/></StyledButton>}
        {/* 검색창에 입력된 text 내용이 있을 경우 검색 버튼이 활성화됩니다. */}
        </SearchBox>
        <MenuStyled>
        <a href="/" onClick={onClickMenu1} style={fontStyle1}>빌려줄게요</a>
        <a href="/" onClick={onClickMenu2} style={fontStyle2}>빌려주세요</a>
        </MenuStyled>
        <hr></hr>
    </PageStyled>
    <List>
    {(!search&&lendBtn)&&lendYouList.map((data) => { //빌려줄게요 게시판(default)
                return (<PostComponent2
                        image={data.image}
                        title={data.title}
                        postDate={data.postDate} 
                        writerAddress={data.writerAddress} 
                        startDate={data.startDate}
                        endDate={data.endDate}
                        cost={data.cost}
                        key={data.id}
                        />
                    );
                    
                //아래는 테스트용 더미 데이터입니다. 필요없다면 지워주세요.
                // return (<PostComponent2
                //     img="images/logo.png"
                //     title={data.email}
                //     postDate="2021/08/19"
                //     writerAddress="강서구 등촌3동" 
                //     startDate="8/12"
                //     endDate="8/30"
                //     cost="20,000"
                //     key={data.id}
                //     />
                // );
                })}
    {(search&&lendBtn)&&filteredPost.map((data)=>{ //빌려줄게요 게시판에서 검색한 경우 나오는 post
                      return (<PostComponent2
                        image={data.image}
                        title={data.title}
                        postDate={data.postDate} 
                        writerAddress={data.writerAddress} 
                        startDate={data.startDate}
                        endDate={data.endDate}
                        cost={data.cost}
                        key={data.id}
                        />
                    );
                    //아래는 테스트용 더미 데이터입니다. 필요없다면 지워주세요.
                    // return (<PostComponent2
                    //     img="images/logo.png"
                    //     title={data.email}
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
            return (<PostComponent
                        title={data.title}
                        postDate={data.postDate} 
                        writerAddress={data.writerAddress} 
                        startDate={data.startDate}
                        endDate={data.endDate}
                        cost={data.cost}
                        key={data.id}
                        />
                        
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
            return (<PostComponent
                title={data.title}
                postDate={data.postDate} 
                writerAddress={data.writerAddress} 
                startDate={data.startDate}
                endDate={data.endDate}
                cost={data.cost}
                key={data.id}
                />
                
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

export default MainBoards;
export {StyledButton};