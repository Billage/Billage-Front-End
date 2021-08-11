import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import Logo from "./Logo"
import LoginBtn from "./Login_btn"
import axios from 'axios';
import {useCookies} from 'react-cookie';
import { withRouter } from 'react-router-dom';

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
      if(cookies.rememberId !== undefined) {
        setId(cookies.rememberId);
        setSaveId(true);
      }
    }, []);
  
    const handleOnChange = (e) => {
      setSaveId(e.target.checked);
      if(e.target.checked){  //checkBox 체크하면
        setCookie('rememberId', id, {maxAge: 2000});
      } else {  //checkBox지우면
        removeCookie('rememberId'); //쿠키에서 삭제
      }
    }

    const onSubmitLogin = (event) => {
        event.preventDefault(); 

        //아이디 또는 비밀번호 입력안했을 때 
        if (!id) {
          alert('아이디를 입력하세요');
          return;
        } else if (!password) {
          alert('비밀번호를 입력하세요');
          return;
        }

        // console.log('Id', id)
        // console.log('Password', password)
        // console.log('SaveId', saveId)

        //서버에 보냄
       let ans = {
            id: id,
            password: password
            // , saveid: saveId
        }

      axios.post('https://reqres.in/api/login', ans)
        //성공
        .then((res)=>{
            console.log(res);
            // props.history.push('/'); //메인 화면으로 이동
        })
        //에러
        .catch(error=>{
            console.log(error);
        });
    }

    const Left = styled.div`
        text-align:left;
        color: gray;
    `;
    const Right = styled.div`
        text-align:right;
    `;

    let style = {
        width:"420px",
        height:"60px"
      }
      
   return (
       <div>
           <Logo></Logo>
            <form onSubmit={onSubmitLogin}>
                <input type="email" placeholder='빌리지 ID' style={style} value={id} onChange={onIdHandler}/><br/><br/>
                <input type="password" placeholder='비밀번호' style={style} value={password} onChange={onPasswordHandler}/>
                <br/>
                <table>
                    <tr>
                        <td><Left><input type="checkbox" name="save_id" value="save_id" checked={saveId} onChange={handleOnChange}/>ID 저장</Left></td>
                        <td><Right><a href="/login">회원가입</a></Right></td> {/*일단 로그인 페이지로 연결*/}
                    </tr>
                </table>
                
                <br/>
                <button type="submit"><LoginBtn title="빌리지"></LoginBtn></button>
                <br/><br/>
                <LoginBtn title="카카오톡"></LoginBtn>

            </form>
        </div>
    )
}

export default LoginPage