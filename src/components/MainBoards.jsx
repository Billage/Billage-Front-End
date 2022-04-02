import React, { useState, useEffect } from 'react';
import BoardNav from './BoardNav';
import styled from "styled-components";
import axios from 'axios';
import PostComponent from './PostComponent';
import PostComponent2 from './PostComponent2';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../index.css';
import '../App.css';
import { Layout, Menu } from 'antd';
import { useMediaQuery } from "react-responsive"
import {
    UserOutlined,
    setTwoToneColor,
    RightCircleTwoTone,
    LeftCircleTwoTone,
    EditOutlined,
    ScissorOutlined,
    HeartOutlined,
    CommentOutlined,
    CopyOutlined,
    SolutionOutlined,
    VerticalAlignTopOutlined
} from '@ant-design/icons';
setTwoToneColor('#EBCAFD');
const { Header, Sider, Content } = Layout;
//검색박스 전체 (회색 둥글둥글 모양) 스타일링입니다.
const SearchBox = styled.div`
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
const Input = styled.input`
    width:95%;
    outline:none;
    border:none;
    border-radius:20px;
    height:25px;
    background:none;
`;
//이미지 태그 (각 버튼들에 들어가는 아이콘) 대신 쓰는 component입니다.
export const Img = styled.img`
    max-width: 100%;
    height:auto;
`;
//각 버튼들 (글 등록, )
const StyledButton = styled.button`
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
//게시글 리스트 component입니다.
const List = styled.div`
    font-family:'KoddiUDOnGothic-Regular';
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
    aside {
    max-width: 0;
    min-width: 0;
    display:block;
    width:0;
}
`;
//메뉴바
const MBar = styled(Menu)`
// .ant-menu > .ant-menu-item:hover,
// .ant-menu > .ant-menu-submenu:hover,
// .ant-menu > .ant-menu-item-active,
// .ant-menu> .ant-menu-submenu-active,
// .ant-menu > .ant-menu-item-open,
// .ant-menu> .ant-menu-submenu-open,
// .ant-menu > .ant-menu-item-selected,
// .ant-menu > .ant-menu-submenu-selected {
//   color: red;
//   border-bottom: 2px solid red;
// }
    .ant-menu-item-selected {
        background-color:  #EBCAFD !important;
        color: #ffffff;
    }
    .ant-menu-item:hover {
        background-color:  #EBCAFD !important;
        color: #ffffff;
    }
    .ant-menu-item-active {
        background-color:  #EBCAFD !important;
        color: #ffffff;
    }
    .ant-menu-item-open{
        background-color:  #EBCAFD !important;
        color: #ffffff;
    }
    .ant-menu-item-selected::after {
        border-right: 2px solid #A352CC;
    }
    .ant-menu-title-content>a{
        &:hover{
        color:#ffffff;
        }
    }
`;
const SideBar = styled(Sider)`
    display: ${props => props.display};
// pointer-events:none;
// aside{
//         max-width: 0px !important;
//         min-width: 0px !important;
//         width:0px;
//         pointer-events:none;
// }
// .ant-layout-sider .ant-layout-sider-collapsed .ant-layout-sider-dark {
//     max-width: 0px !important;
//     min-width: 0px !important;
// }
// .ant-layout .ant-layout-has-sider .ant-layout-sider{
//     max-width: 0px !important;
//     min-width: 0px !important;
//     width:0;
// }
// .ant-layout-sider-children .ant-menu.ant-menu-inline-collapsed{
//     max-width: 0px !important;
//     min-width: 0px !important;
//     width:0;
//   }
`;

// 로그인 상태를 서버에서 구분 후, 그에 맞는 게시글을 클라이언트로 전송
const BorrowBoard = () => {
    const [login, setLogin] = useState(''); // 현재 로그인 상태
    const [showAddress, setShowAddress] = useState(''); //현재 사용자의 주소
    const [searchText, setSearchText] = useState(''); //검색 input 창에 입력되는 text
    const [lendYouList, setLendYouList] = useState([]); //빌려줄게요 리스트. 백엔드에서 가져온 데이터 담는 배열
    const [borrowMeList, setBorrowMeList] = useState([]); //빌려주세요 리스트
    const [fontStyle1, setFontStyle1] = useState({ color: "black", fontWeight: "bold" });
    const [fontStyle2, setFontStyle2] = useState({ color: "gray" });
    const [lendBtn, setLendBtn] = useState(true); //현재 빌려줄게요 게시판인지 확인
    const [borrowBtn, setBorrowBtn] = useState(false); //현재 빌려주세요 게시판인지 확인
    const [search, setSearch] = useState(false); //검색 버튼이 눌렸는지 확인하는 변수
    const [filteredPost, setFilteredPost] = useState([]); //검색한 post 를 담는 배열

    const onClickMenu1 = (e) => {
        e.preventDefault(); setFontStyle1({ color: "black", fontWeight: "bold" }); setFontStyle2({ color: "gray" });
        setLendBtn(true); setBorrowBtn(false); setSearch(false);
    };
    const onClickMenu2 = (e) => {
        e.preventDefault(); setFontStyle1({ color: "gray" }); setFontStyle2({ color: "black", fontWeight: "bold" });
        setBorrowBtn(true); setLendBtn(false); setSearch(false);
    };
    //메뉴버튼 여닫는 toggle 관련 버튼
    const [collapsed, setCollpased] = useState(true);
    //메뉴 없애기
    const toggle = () => {
        setCollpased(!collapsed);
    };
    // 유저 정보 가져오기
    const getUser = () => {
        return axios.get("http://localhost:7000/auth", { withCredentials: true })
    };
    // 빌려줄게요 게시글 가져오기
    const getLendYou = () => {
        return axios.get("http://localhost:7000/post/lend", { withCredentials: true })
    };
    // 빌려주세요 게시글 가져오기
    const getBorrowMe = () => {
        return axios.get("http://localhost:7000/post/borrow", { withCredentials: true })
    };
    //각 게시판의 글을 가져올때 사용하는 통신입니다.
    useEffect(() => {  //처음 페이지가 실행될 때, 로그인 상태바뀔때, 사용자 주소 바뀔때 실행됨
        axios.all([getLendYou(), getBorrowMe(), getUser()]) // axios.all로 여러 개의 request를 보내고
            .then(axios.spread((lendResp, borrowResp, user) => { // response를 spread로 받는다. 
                setLendYouList(lendResp.data);
                setBorrowMeList(borrowResp.data);
                if (user.data) {
                    setShowAddress(user.data.address);
                    setLogin(true);
                } else {
                    setLogin(false);
                }
            }))
            .catch((error) => {
                console.error(error)
            })
    }, []);

    const searchChange = (e) => {//검색창에 text 입력했을 때 입력한 text를 검색 text에 넣어줌
        setSearchText(e.target.value);
    };

    const btnClick = () => { //검색창 버튼 클릭했을 때 뜨는 버튼
        searchText.trim();
        if (lendBtn) {
            const filtered = lendYouList.filter((post) =>
                post.title.includes(searchText)
            );
            setFilteredPost(filtered);
            console.log(filtered);
        } else {
            const filtered = borrowMeList.filter((post) =>
                post.title.includes(searchText)
            );
            setFilteredPost(filtered);
            console.log(filtered);
        }
        setSearchText('');
        setSearch(true);
    };

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            btnClick();
        }
    };

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    //화면 크기별 처리 - 미디어쿼리
    const soSmall = useMediaQuery({
        query: "(max-width:400px)"
    });

    const normal = useMediaQuery({
        query: "(min-width:401px)"
    });

    return (
        <Layout>
            <SideBar display={collapsed ? 'none' : 'block'} trigger={null} collapsible collapsed={collapsed} style={{
                background: '#ffffff', width: '0', height: '100',
            }}>
                <MBar mode='inline' inlineCollapsed='true' style={{ color: '#7D7D7D' }}>
                    {login ?
                        <>
                            <Menu.Item key="1" icon={<UserOutlined />} >
                                <a href="http://localhost:7000/auth/logout"> 로그아웃 </a>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<ScissorOutlined />}>
                                <a href="http://localhost:3000/myinfo"> 내 정보 수정 </a>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<EditOutlined />}>
                                <a href="http://localhost:3000/write"> 게시글 작성 </a>
                            </Menu.Item>
                            <Menu.Item key="4" icon={<CopyOutlined />}>
                                <a href="http://localhost:3000/mypost"> 내가 쓴 글 </a>
                            </Menu.Item>
                            <Menu.Item key="5" icon={<SolutionOutlined />}>
                                <a href="http://localhost:3000/myreview"> 내가 쓴 리뷰 </a>
                            </Menu.Item>
                            <Menu.Item key="6" icon={<CommentOutlined />}>
                                <a href="http://localhost:3000/chat"> 내 쪽지함 </a>
                            </Menu.Item>
                            <Menu.Item key="7" icon={<HeartOutlined />}>
                                <a href="http://localhost:3000/scrap"> 내가 찜한 물품 </a>
                            </Menu.Item>
                            <Menu.Item key="8" icon={<VerticalAlignTopOutlined />}>
                                <a href="http://localhost:3000/delete"> 탈퇴하기 </a>
                            </Menu.Item>
                        </>
                        : <>
                            <Menu.Item key="1" icon={<UserOutlined />}  >
                                <a href="/login" >로그인 / 회원가입</a>
                            </Menu.Item>
                        </>}

                </MBar>
            </SideBar>
            <Layout className="site-layout">
                <BoardNav showAddress={showAddress} login={login} boardName="게시판" size={normal ? "normal" : "soSmall"} collapsed={collapsed} />
                <Header className="site-layout-background" style={{ position: 'absolute', top: '10px', padding: '20px', background: '#ffffff', fontSize: '30px' }}>
                    {React.createElement(collapsed ? RightCircleTwoTone : LeftCircleTwoTone, {
                        className: 'trigger',
                        onClick: toggle,
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        position: 'sticky',
                        top: '0px',
                        zIndex: 1,
                        backgroundColor: 'white',
                    }}
                >
                    <PageStyled style={{ visibility: collapsed ? 'visible' : 'hidden' }}>
                        <br />
                        <SearchBox>
                            <Input value={searchText} onChange={searchChange} onKeyPress={onKeyPress} />
                            {searchText && <StyledButton onClick={btnClick} color="#E5E5E5"><Img src="img/search.png" alt="검색" /></StyledButton>}
                            {/* 검색창에 입력된 text 내용이 있을 경우 검색 버튼이 활성화됩니다. */}
                        </SearchBox>
                        <MenuStyled>
                            <a href="/" onClick={onClickMenu1} style={fontStyle1}>빌려줄게요</a>
                            <a href="/" onClick={onClickMenu2} style={fontStyle2}>빌려주세요</a>
                        </MenuStyled>
                        <hr></hr>
                    </PageStyled>
                    <List style={{ visibility: collapsed ? 'visible' : 'hidden' }}>
                        {(!search && lendBtn) && soSmall && lendYouList.map((data) => { //빌려줄게요 게시판 - 작은 컴포넌트
                            return (<Link to={`post/${data.id}`}>
                                <PostComponent2
                                    size="soSmall"
                                    image={data.url.split('===')[0]}
                                    title={data.title}
                                    postDate={data.date}
                                    writerAddress={data.address}
                                    startDate={data.startDate}
                                    endDate={data.endDate}
                                    cost={numberWithCommas(Number(data.price))}
                                    key={data.id}
                                /></Link>);
                        }
                        )}
                        {(!search && lendBtn) && normal && lendYouList.map((data) => { //빌려줄게요 게시판 - 일반 컴포넌트
                            return (<Link to={`post/${data.id}`}>
                                <PostComponent2
                                    size="normal"
                                    image={data.url.split('===')[0]}
                                    title={data.title}
                                    postDate={data.date}
                                    writerAddress={data.address}
                                    startDate={data.startDate}
                                    endDate={data.endDate}
                                    cost={numberWithCommas(Number(data.price))}
                                    key={data.id}
                                /></Link>);
                        }
                        )}
                        {(search && lendBtn) && soSmall && filteredPost.map((data) => { //빌려줄게요 게시판에서 검색 - 작은 컴포넌트
                            return (<Link to={`post/${data.id}`}>
                                <PostComponent2
                                    size="soSmall"
                                    image={data.url.split('===')[0]}
                                    title={data.title}
                                    postDate={data.date}
                                    writerAddress={data.address}
                                    startDate={data.startDate}
                                    endDate={data.endDate}
                                    cost={numberWithCommas(Number(data.price))}
                                    key={data.id}
                                /></Link>);
                        }
                        )}
                        {(search && lendBtn) && normal && filteredPost.map((data) => { //빌려줄게요 게시판에서 검색 - 작은 컴포넌트
                            return (<Link to={`post/${data.id}`}>
                                <PostComponent2
                                    size="nomal"
                                    image={data.url.split('===')[0]}
                                    title={data.title}
                                    postDate={data.date}
                                    writerAddress={data.address}
                                    startDate={data.startDate}
                                    endDate={data.endDate}
                                    cost={numberWithCommas(Number(data.price))}
                                    key={data.id}
                                /></Link>);
                        }
                        )}
                        {(!search && borrowBtn) && soSmall && borrowMeList.map((data) => { //빌려주세요 게시판 - 작은 컴포넌트
                            return (<Link to={`post/${data.id}`}>
                                <PostComponent
                                    size="soSmall"
                                    title={data.title}
                                    postDate={data.date}
                                    writerAddress={data.address}
                                    startDate={data.startDate}
                                    endDate={data.endDate}
                                    cost={numberWithCommas(Number(data.price))}
                                    key={data.id}
                                /></Link>);
                        }
                        )}
                        {(!search && borrowBtn) && normal && borrowMeList.map((data) => { //빌려주세요 게시판 - 일반 컴포넌트
                            return (<Link to={`post/${data.id}`}>
                                <PostComponent
                                    size="normal"
                                    title={data.title}
                                    postDate={data.date}
                                    writerAddress={data.address}
                                    startDate={data.startDate}
                                    endDate={data.endDate}
                                    cost={numberWithCommas(Number(data.price))}
                                    key={data.id}
                                /></Link>);
                        }
                        )}
                        {(search && borrowBtn) && normal && filteredPost.map((data) => { //빌려주세요 게시판에서 검색 - 일반 컴포넌트
                            return (<Link to={`post/${data.id}`}>
                                <PostComponent
                                    size="normal"
                                    title={data.title}
                                    postDate={data.date}
                                    writerAddress={data.address}
                                    startDate={data.startDate}
                                    endDate={data.endDate}
                                    cost={numberWithCommas(Number(data.price))}
                                    key={data.id}
                                /></Link>);
                        }
                        )}
                        {(search && borrowBtn) && soSmall && filteredPost.map((data) => { //빌려주세요 게시판에서 검색 - 작은 컴포넌트
                            return (<Link to={`post/${data.id}`}>
                                <PostComponent
                                    size="soSmall"
                                    title={data.title}
                                    postDate={data.date}
                                    writerAddress={data.address}
                                    startDate={data.startDate}
                                    endDate={data.endDate}
                                    cost={numberWithCommas(Number(data.price))}
                                    key={data.id}
                                /></Link>);
                        }
                        )}
                    </List>
                </Content>
            </Layout>
        </Layout>
    );
};

export default BorrowBoard;
export { StyledButton };