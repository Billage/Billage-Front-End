import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import Logo from "./Logo"
import LoginBtn from "./Login_btn"
import axios from 'axios';
import { useCookies } from 'react-cookie';
// id저장, 회원가입 부분 style
const Styled = styled.div`
  width: 390px;
  margin-top: auto;
  margin-botton: auto;
  display: inline-block;
  margin: 5px 0px 20px 5px;
`;
const Center = styled.div`
  display: flex;
  justify-content: center;

`;
//Id, Pw input창 
const Input = styled.input`
    // border-radius: 30px;
    border-width: thin;
    border-color: #E5E5E5;
    border-style: solid; 
    width:250px;
    height:40px;
`;


function LoginPage(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [saveId, setSaveId] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['rememberId']);
  const onIdHandler = (e) => {
    setId(e.currentTarget.value);
  }
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }
  //쿠키에 id저장
  useEffect(() => {
    if (cookies.rememberId !== undefined) {
      setId(cookies.rememberId);
      setSaveId(true);
    }
  }, []);

  const handleOnChange = (e) => {
    setSaveId(e.target.checked);
    if (e.target.checked) {  //checkBox 체크하면
      setCookie('rememberId', id, { maxAge: 2000 });
    } else {  //checkBox지우면
      removeCookie('rememberId'); //쿠키에서 삭제
    }
  }

  const kakaoSubmit = (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:7000/auth/kakao";
  }

  const onSubmitLogin = (event) => {
    event.preventDefault();

    //아이디 또는 비밀번호 입력안했을 때 
    if (!id && !password) {
      alert('아이디와 비밀번호를 입력하세요');
      return;
    } else if (!id) {
      alert('아이디를 입력하세요');
      return;
    } else if (!password) {
      alert('비밀번호를 입력하세요');
      return;
    }
    //서버에 보냄
    let ans = {
      email: id,
      password: password
    }
    axios.post('http://localhost:7000/auth/login', ans, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          alert(res.data);
        } else {
          props.history.push('/');
        };
      })
      .catch((error) => {
        console.log(error);
      });
  }
  let inputStyle = {
    width: "380px",
    height: "60px",
    margin: "8px"
  }

  return (
    <div>
      <Logo></Logo>
      <Center>
        <form onSubmit={onSubmitLogin}>
          <Input type="email" placeholder='빌리지 ID' style={inputStyle} value={id} onChange={onIdHandler} /><br />
          <Input type="password" placeholder='비밀번호' style={inputStyle} value={password} onChange={onPasswordHandler} />
          <br />
          <Styled>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label style={{ color: '#878787' }}><input type="checkbox" name="save_id" value="save_id" checked={saveId} onChange={handleOnChange} />ID 저장</label>
              <a href="/find" style={{ marginLeft: '160px', color: 'inherit', textDecoration: 'inherit' }}>ID/PW 찾기</a>
              <a href="/join" style={{ color: 'inherit', textDecoration: 'inherit' }}>회원가입</a>
            </div>
          </Styled>
          <br />
          <button style={{ border: 'none', background: 'none' }} type="submit"><LoginBtn title="빌리지"></LoginBtn></button>
          <br />
          <button style={{ border: 'none', background: 'none' }} onClick={kakaoSubmit} ><LoginBtn title="카카오톡"></LoginBtn></button>
        </form>

      </Center>
    </div>
  )
}

export default LoginPage