import React, {useState, useEffect} from 'react';
import BoardNav from '../components/BoardNav';
import styled from "styled-components";
import axios from 'axios';
import PostComponent from '../components/PostComponent';
import PostComponent2 from '../components/PostComponent2';

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

const BorrowBoard=()=>{
    const [showAddress, setShowAddress]=useState('##동'); //현재 사용자의 주소
    const [searchText,setSearchText]=useState(''); //검색 input 창에 입력되는 text
    const [dataList,setDataList]=useState([]); //백엔드에서 가져온 데이터 담는 배열

    const [fontStyle1, setFontStyle1]=useState({color: "black"});
    const [fontStyle2, setFontStyle2]=useState({color: "gray"});

    const [post, setPost]=useState(<PostComponent2></PostComponent2>);
    const onClickMenu1 = (e) => {e.preventDefault(); setFontStyle1({color: "black"}); setFontStyle2({color: "gray"});setPost(<PostComponent2></PostComponent2>)};
    const onClickMenu2 = (e) => {e.preventDefault(); setFontStyle1({color: "gray"}); setFontStyle2({color: "black"});setPost(<PostComponent></PostComponent>)};
    //  const onClickMenu1 = (e) => {
    //     e.preventDefault();
    //     setFontStyle1({color: "black"});
    //     setFontStyle2({color: "gray"});
    //     setPost(<PostComponent2
    //         image="https://ifh.cc/g/Nfh1sN.png"
    //         title="빔프로젝터 빌려드려요"
    //         postDate="08/02" 
    //         writerAddress="송파구 잠실동" 
    //         startDate="08/12"
    //         endDate="08/31"
    //         cost="30,000"
    //     /> 
        
    //        )};
        
    // const onClickMenu2 = (e) => {
    //     e.preventDefault();
    //     setFontStyle1({color: "gray"});
    //     setFontStyle2({color: "black"});
    //     setPost(<PostComponent
    //         title="오렌지 나눠가지실 분."
    //         postDate="08/19" 
    //         writerAddress="미추홀구 용현동" 
    //         startDate="08/19"
    //         endDate="08/19"
    //         cost="5,000"
    //     />   )};

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

    //현재주소 받기
    useEffect(() => {
        axios.get('url')
        .then(({ address }) => {
            setShowAddress(address);
        })
        .catch( e => console.log(e));
     }, []);

    const searchChange=(e)=>{//검색창에 text 입력했을 때 입력한 text를 검색 text에 넣어줌
        setSearchText(e.target.value);
    };
    const btnClick=()=>{ //검색창 버튼 클릭했을 때 뜨는 버튼
        alert('검색했습니다');
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

        {post}

    <List>

    {/* dataList에서 받아온 data 들을 하나씩 게시글 컴포넌트로 감쌉니다.
    필요한 데이터들은 props로 넘겨줍니다. */}
    {dataList.map((data) => (
        // PostComponent 내의 변수 설명은 PostComponent.jsx 파일 내부에
                        <PostComponent
                        title={data.title}
                        postDate={data.postDate} 
                        writerAddress={data.writerAddress} 
                        startDate={data.startDate}
                        endDate={data.endDate}
                        cost={data.cost}
                        key={data.id}
                        />
                        
                    )
                )}
        {dataList.map((data) => (
                        <PostComponent2
                        image={data.image}
                        title={data.title}
                        postDate={data.postDate} 
                        writerAddress={data.writerAddress} 
                        startDate={data.startDate}
                        endDate={data.endDate}
                        cost={data.cost}
                        key={data.id}
                        />
                    )
        )}
   

              
    </List>
    </>
    );
};

export default BorrowBoard;
export {StyledButton};