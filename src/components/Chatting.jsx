import { React, useEffect, useState } from 'react'
import styled from "styled-components";
import '../ChatStyle.css';
import axios from 'axios';
import send from '../components/images/send.png';
import moment from "moment";
import { useParams } from 'react-router';

const TopStyled = styled.ul`
    display: flex;
    height: 25px;
    align-items:center;
    list-style:none;
`;
const Top = styled.div`
    padding-top: 1px;
    background-color: white;
    //상단고정
    position: sticky;
    top: 0;
    z-index: 1;
`;
const ChatList = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  overflow-y: auto;
`;

const msessage = styled.span`
    // display: inline-block;
    // padding: 7px 15px;
    // margin-bottom: 20px;
    // margin-top: 5px;
`;

const Nick = styled.div`
    font-size: 5px;
    color: gray;
    margin-bottom: -4px;
`;

const InputStyled = styled.input`
    margin: 5px 5px 5px 5px;
    display: flex;
    width: 95%;
    border:none;
    outline:none;
`;
const InputBox = styled.div`
    margin: 5px 10px 5px 10px;
    display: flex;
    padding: 2px;
    border: solid 1px lightgray;
    border-radius : 10px;
    height: 25px;
    align-items:center;
    background-color: white;
`;
const Bottom = styled.div`
  background-color: white;
  // 하단고정
    position: fixed;
    bottom:0px;
    width: 100%;
`;

const Button = styled.button`
    border: none;
    background: none;
    margin-top: 3px;
`;

//날짜 스타일 
const Line = styled.div`
    display: flex;
    flex-basis: 100%;
    align-items : center;
    color: rgba(0, 0, 0, 0.35);
    font-size: 13px;
    margin: 8px 0px;
    ::before {
      content: "";
      flex-grow: 1;
      margin: 0px 16px;
      background: rgba(0, 0, 0, 0.35);
      height: 1px;
      line-height: 0px;
    }
    ::after {
      content: "";
      flex-grow: 1;
      margin: 0px 16px;
      background: rgba(0, 0, 0, 0.35);
      height: 1px;
      line-height: 0px;
    }
`;
//시간 스타일
const MyTime = styled.span`
    color: gray;
    font-size: 5px;
    margin-right: 4px;
`;
const AnotherTime = styled.span`
    color: gray;
    font-size: 5px;
    margin-left: 4px;
`;

const Chatting = () => {
  const { roomId } = useParams();
  const [newMessage, setNewMessage] = useState(""); //채팅 입력 값
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  let [beforeTime, setBeforeTime] = useState("");

  useEffect(() => {
    // 기존 쪽지
    axios.get('http://localhost:7000/chat/room', { params: { roomId: roomId, } })
      .then(res => {
        setMessages(res.data);
      }).catch((error) => {
        console.log(error);
      })
    // 유저 정보
    axios.get("http://localhost:7000/auth", { withCredentials: true })
      .then(res => {
        setUser(res.data.nick);
      }).catch((error) => {
        console.log(error);
      })
    setBeforeTime("");
  }, []);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const onSendMessage = () => {
    const data = {
      body: newMessage,
      roomId: roomId,
      date: moment().format('YYYY-MM-DD hh:mm'),
    }
    axios.post('http://localhost:7000/chat/send', data,
      { withCredentials: true })
      .then((res) => {
      })
      .catch((error) => {
        console.log(error);
      });

    setNewMessage("");
  };

  //뒤로가기 icon 
  const backClick = () => {
    window.history.back();
  }

  const dateCheck = (before, now) => {
    if (moment(before).format("YYYY-MM-DD").toString() !== moment(now).format("YYYY-MM-DD").toString()) {
      beforeTime = now;
      return <Line>{moment(now).format('yyyy년 MM월 DD일')}</Line>;
    }
  };

  const massageList = messages.map((msg) => {
    return msg.sender === user ? (
      <div>
        {dateCheck(beforeTime, msg.date)}
        <div className="myChat">
          <MyTime>{moment(msg.date).format('HH:mm')}</MyTime>
          <span className="msg">{msg.body}</span>
        </div>
      </div>
    ) : (
      <div>
        {dateCheck(beforeTime, msg.date)}
        <div className="anotherChat">
          <span className="msg">{msg.body}</span>
          <AnotherTime>{moment(msg.date).format('HH:mm')}</AnotherTime>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Top>
        <TopStyled>
          <li onClick={backClick} style={{ 'color': 'gray' }}> <img src="https://ifh.cc/g/5nV7Gz.png" width="20px" style={{ 'marginTop': '10px' }}></img></li>
          <li style={{ 'margin-left': '15px', 'font-weight': 'bold' }}></li>
        </TopStyled>
        <hr />
      </Top>
      <div>
        <ChatList>
          {massageList}
        </ChatList>
      </div>
      <Bottom>
        <form onSubmit={onSendMessage}>
          <InputBox>
            <InputStyled
              value={newMessage}
              onChange={handleNewMessageChange}
            />
            <Button>
              <img src={send} style={{ width: '18px', height: 'auto', marginBottom: '3px' }} alt="" />
            </Button>
          </InputBox>
        </form>
      </Bottom>
    </div>
  );
};

export default Chatting;

//   return (
//     <div>
//       <Top>
//         <TopStyled>
//           <li onClick={backClick} style={{ 'color': 'gray' }}>⬅</li>
//           <li style={{ 'margin-left': '15px', 'font-weight': 'bold' }}></li>
//         </TopStyled>
//         <hr />
//       </Top>
//       <div>
//         <ChatList>
//           {messages.map((msg) => {
//             return (
//               msg.sender === user ? (
//                 <div>
//                   <div className="myChat">
//                     <MyTime>{(msg.date).format('HH:mm')}</MyTime>
//                     <span className="msg">{msg.body}</span>
//                   </div>
//                 </div>
//               ) : (
//                 <div>
//                   <div className="anotherChat">
//                     <span className="msg">{msg.body}</span>
//                     <AnotherTime>{msg.date}</AnotherTime>
//                   </div>
//                 </div>
//               ))
//           })}
//         </ChatList>
//         {/* <ChatList>
//               <Line>2021년 9월 6일</Line>
//               <div className="myChat">
//                 <MyTime>2:40</MyTime>
//                 <span className="msg">안녕하세요 빌리고 싶어요!</span> 
//               </div>
//               <div className="anotherChat">
//                 <span className="msg">안녕하세요</span>
//                 <AnotherTime>11:20</AnotherTime>
//               </div>
//               <div className="anotherChat">
//                 <span className="msg">어디서 만날까요?</span>
//                 <AnotherTime>11:20</AnotherTime>
//               </div>
//               <div className="myChat">
//                 <MyTime>2:40</MyTime>
//                 <span className="msg">강남역으로 갈게요</span> 
//               </div>
//             </ChatList>  */}
//       </div>
//       <Bottom>
//         <form onSubmit={onSendMessage}>
//           <InputBox>
//             <InputStyled
//               value={newMessage}
//               onChange={handleNewMessageChange}
//             />
//             <Button>
//               <img src={send} style={{ width: '20px', height: 'auto' }} alt="" />
//             </Button>
//           </InputBox>
//         </form>
//       </Bottom>

//     </div>
//   );
// };

// export default Chatting;