/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import styled from "styled-components";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale'
import moment from 'moment';
import 'moment/locale/ko';
import del_img from '../components/images/del.png'

const PageStyled = styled.body`
display:flex;
flex-direction:column;
// align-items:center;
`;
const InputStyled = styled.input`
        margin: 0px 20px;
        border: none;
        outline: none;
        display: flex;
        height: 50px;
        width: 90%;
  `;
const TextStyled = styled.textarea`
        margin: 0px 20px;
        border: none;
        outline: none;
        display: flex;
        height: 300px;
        width: 90%;
  `;
const TopStyled = styled.ul` 
  height:30px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  list-style:none;
  margin-top:5;
  padding:15px 20px 0 20px;
  color: black;
  font-size:15px;
  font-weight:bold;

  `;
const BoardStyled = styled.ul`
    display:flex;
    align-items:center;
    justify-content:space-evenly;
    list-style:none;
    margin:0;
    padding:0 20px 0 20px;
`;
//시작일, 종료일 달력 스타일
const DatePickerStyled = styled(DatePicker)`
    text-align: center;
    width: 150px;
    height: 30px;
    font-size: 15px;
    border-radius: 20px;
    border: 1px solid gray;
`;
const DateTitle = styled.div`
    color: gray;
    white-space: nowrap;
    font-size: 13px;
    margin-bottom: 5px;
    margin-left : 43px;
`;
const DivStyled = styled.div`
    display: flex;
    justify-content:space-evenly;
`;
const MainContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 15px;
  @media (max-width: 400px) {
    width: 100%;
    max-width: 400px;
    justify-content: start;
    flex-wrap: wrap;
  }
`;
//이미지-가로 스크롤
const Scroll = styled.div`
  display: flex;
  overflow-x:scroll;
  white-space:nowrap;
  ::-webkit-scrollbar { display: none; }
`;
const InitialBox = styled.div`
    width: 60px;
    height: 60px;
    border-radius:5px;
    margin-right:10px;
    border : solid 1px gray;
    display : flex;
    align-items: center;
    flex-direction: column;
`;
const ImgAreaContainer = styled.div`
  display: flex;
  align-items: center;
`;
const ImgArea = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  object-fit: cover;
`;
const Img = styled.img`
  object-fit: cover;
  width: 100%;
`;
const FileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: none;
`;
//이미지 삭제 버튼
const DeleteButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: -17px;
  margin-top: -46px;
`;

const Hr = styled.hr`
  border: solid 0.1px #E7E7E7;
`;

function Write(props) {
  const [title, setTitle] = useState(""); //제목
  const [price, setPrice] = useState(""); //가격

  const [startDate, setStartDate] = useState(new Date()); //대여 시작 날짜
  const [endDate, setEndDate] = useState(new Date()); //대여 끝 날짜
  const [content, setContent] = useState(""); //내용
  const [fontStyle1, setFontStyle1] = useState({ 'background': "linear-gradient(to top, #FFE400 50%, transparent 50%)", color: "black" });
  const [fontStyle2, setFontStyle2] = useState({ 'background-color': "transparent", color: "lightgray" });
  const [menu, setMenu] = useState(true);
  const [menu1, setMenu1] = useState(true); //빌려줄게요
  const [menu2, setMenu2] = useState(false); //빌려주세요
  const [imgArr, setImg] = useState([]);
  const [list, setList] = useState([]);
  const formData = new FormData();
  let i = 0;
  // const insertImg = (e) => {
  //   for (i; i < e.target.files.length; i++) {
  //     formData.append('img', e.target.files[i]);
  //   }
  //   axios.post('http://localhost:7000/post/img', formData, { withCredentials: true })
  //     .then((res) => {
  //       list.push(...res.data);
  //       setImg(list);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  const insertImg = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('img', e.target.files[i]);
    }
    axios.post('http://localhost:7000/post/img', formData, { withCredentials: true })
      .then((res) => {
        setImg(res.data);
        console.log();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //업로드 이미지 미리보기
  const getPreviewImg = () => {
    if (imgArr === null || imgArr.length === 0) {
      return (
        <ImgAreaContainer>
          <ImgArea>
            <Img src='https://ifh.cc/g/F7gnxH.gif' alt='이미지없음' />
          </ImgArea>
        </ImgAreaContainer>
      )
    } else {
      return imgArr.map(img => {
        const delOnClik = (e) => {
          e.preventDefault();
          deleteImg(img);
        }
        return (
          <ImgAreaContainer>
            <ImgArea>
              <Img src={`http://localhost:7000${img}`} />
            </ImgArea>
            <DeleteButton onClick={delOnClik}><img src={del_img} style={{ width: '11px' }} /></DeleteButton>
          </ImgAreaContainer>
        )
      })
    }
  }
  //이미지 삭제 
  const deleteImg = (targetImg) => {
    // const arr = list.filter(img => img !== targetImg);
    // console.log(arr);
    // setList(arr)
    const arr = imgArr.filter(img => img !== targetImg);
    setImg(arr);
  }

  //글 등록 버튼 클릭 시  
  const onSubmitWrite = (e) => {
    e.preventDefault();
    if (!title) {
      alert('제목을 입력해주세요');
      return;
    }
    if (!price) {
      alert('가격을 입력해주세요');
      return;
    }
    if (!content) {
      alert('내용을 입력해주세요');
      return;
    }
    //빌려줄게요 게시판에 글쓰기
    if (menu1 === true) {
      let url = '';
      for (let i = 0; i < imgArr.length; i++) {
        if (i === imgArr.length - 1) {
          url += imgArr[i];
        } else {
          url += imgArr[i] + '===';
        }
      }
      const data = {
        title: title,
        body: content,
        price: price,
        startDate: startDate,
        endDate: endDate,
        url: url,
        date: moment().format('YYYY.MM.DD HH:mm'),
      };

      axios.post('http://localhost:7000/post/write/lend', data
        , { withCredentials: true })
        .then((res) => {
          props.history.push('/'); //메인 화면으로이동
        })
        .catch((error) => {
          console.log(error);
        });
    }

    //빌려주세요 게시판에 글쓰기
    if (menu2 === true) {
      const data = {
        title: title,
        body: content,
        price: price,
        startDate: startDate,
        endDate: endDate,
        date: moment().format('YYYY.MM.DD HH:mm')
      };
      console.log(data);
      axios.post('http://localhost:7000/post/write/borrow', data,
        { withCredentials: true })
        .then((res) => {
          props.history.push('/'); //메인 화면으로이동
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <PageStyled>
      <form onSubmit={onSubmitWrite}>
        <TopStyled>
          <li><a href="/" style={{ color: 'gray', 'font-size': '13px', 'font-weight': 'bold' }}>취소</a></li>
          <li>게시글 쓰기</li>
          <li><button type="submit" style={{ color: '#A352CC', border: 'none', background: 'none', 'font-weight': 'bold', 'font-size': '13px' }}>등록</button></li>
        </TopStyled>
        <hr />
        <BoardStyled>
          <li><a href="/" onClick={(e) => { e.preventDefault(); setMenu(true); setMenu1(true); setMenu2(false); setFontStyle1({ 'background': "linear-gradient(to top, #FFE400 50%, transparent 50%)", color: "black" }); setFontStyle2({ 'background-color': "transparent", color: "lightgray" }) }} style={fontStyle1}>빌려줄게요</a></li>
          <li><a href="/" onClick={(e) => { e.preventDefault(); setMenu(false); setMenu1(false); setMenu2(true); setFontStyle1({ 'background-color': "transparent", color: "lightgray" }); setFontStyle2({ 'background': "linear-gradient(to top, #FFE400 50%, transparent 50%)", color: "black" }) }} style={fontStyle2}>빌려주세요</a></li>
        </BoardStyled>
        {menu ? <div>
          <Hr />
          <MainContainer>
            <label htmlFor='file'>
              <InitialBox>
                <img src='https://ifh.cc/g/219dfc.png' alt="camera_img" style={{ width: '30px', 'margin-bottom': '-5px', 'padding-top': '10px' }}></img>
                <p style={{ color: 'gray', 'font-size': '12px' }}>{imgArr.length}/10</p>
              </InitialBox>
            </label>
            <FileInput type="file" id="file" multiple accept="image/*" onChange={(e) => insertImg(e)} style={{ visibility: "hidden" }} />
            <Scroll>
              {getPreviewImg()} {/*사진 미리보기*/}
            </Scroll>
          </MainContainer>
        </div> : <div />}
        <Hr />
        <InputStyled
          type="title"
          name="title"
          placeholder="제목"
          onChange={(event) => setTitle(event.target.value)}
        /> <Hr />
        <InputStyled
          type="number"
          name="price"
          placeholder="가격"
          onChange={(event) => setPrice(event.target.value)}
        /> <Hr />
        <DivStyled>
          <div>
            <DateTitle>대여시작일</DateTitle>
            <DatePickerStyled
              dateFormat="yyyy/MM/dd"
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              locale={ko}
            />
          </div>
          <div>
            <DateTitle>대여종료일</DateTitle>
            <DatePickerStyled
              dateFormat="yyyy/MM/dd"
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              locale={ko}
            />
          </div>
        </DivStyled>
        <Hr />
        <TextStyled
          name="content"
          placeholder="내용"
          onChange={(event) => setContent(event.target.value)}
        />
      </form>
    </PageStyled>
  )
}

export default Write