//빌려주세요 게시판 전체를 나타내는 파일입니다.
import React, {useState, useEffect} from 'react';
import BoardNav from './BoardNav';
import styled from "styled-components";
import axios from 'axios';
import PostComponent from './PostComponent';
//검색박스 전체 (회색 둥글둥글 모양) 스타일링입니다.
const SearchBox=styled.div`
    position:relative;
    background-color:#E5E5E5;
    border-radius:20px;
    margin:15px;
    padding:5px 5px 5px 20px;
    height:30px;
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

const BorrowBoard=()=>{
    const [showAddress, setShowAddress]=useState('용현동'); //현재 사용자의 주소
    const [searchText,setSearchText]=useState(''); //검색 input 창에 입력되는 text
    const [dataList,setDataList]=useState([]); //백엔드에서 가져온 데이터 담는 배열
    
    const loadItem = async () => {
    axios.get("./SearchJson.json")
    .then(({ data }) => {
        setDataList(data);
    })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시
    });
};
    // 페이지가 로드될 때 
    useEffect(() =>{ 
        loadItem(); 
    }, []);

    const searchChange=(e)=>{//검색창에 text 입력했을 때 입력한 text를 검색 text에 넣어줌
        setSearchText(e.target.value);
};
    const btnClick=()=>{ //검색창 버튼 클릭했을 때 뜨는 버튼
        alert('검색했습니다');
    };
    
    return(
    <>
   <BoardNav showAddress={showAddress} boardName="빌려주세요" />
    <SearchBox>
    <Input value={searchText} onChange={searchChange}/>
    {searchText&&<StyledButton onClick={btnClick}  color="#E5E5E5"><Img src="img/search.png" alt="검색"/></StyledButton>}
    {/* 검색창에 입력된 text 내용이 있을 경우 검색 버튼이 활성화됩니다. */}
    </SearchBox>
    <List>
    {/* dataList에서 받아온 data 들을 하나씩 게시글 컴포넌트로 감쌉니다.
    필요한 데이터들은 props로 넘겨줍니다. */}
    {/* {dataList.map((data) => (
        // PostComponent 내의 변수 설명은 PostComponent.jsx 파일 내부에
                       return( <PostComponent
                        title={data.title}
                        postDate={data.postDate} 
                        writerAddress={data.writerAddress} 
                        startDate={data.startDate}
                        endDate={data.endDate}
                        cost={data.cost}
                        key={data.id}
                        />/);
                    )
                )}; */}
                {/* 아래는 게시글 출력 확인차 적어놓은 더미 post component 입니다. */}
                        <PostComponent
                        title="돗자리 빌려주세요."
                        postDate="08/19" 
                        writerAddress="미추홀구 용현동" 
                        startDate="08/20"
                        endDate="08/31"
                        cost="20,000"
                        />
                        <PostComponent
                        title="오렌지 나눠가지실 분."
                        postDate="08/19" 
                        writerAddress="미추홀구 용현동" 
                        startDate="08/19"
                        endDate="08/19"
                        cost="5,000"
                        />                       
    </List>
    </>
    );
};

export default BorrowBoard;
export {StyledButton};
