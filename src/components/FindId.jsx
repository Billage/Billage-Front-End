import React, { Component } from 'react';
import axios from 'axios';
import styled from "styled-components";

const Page = styled.body`
    margin:0;
    padding:20px;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const InputComponent = styled.input`
    border:1px solid #E5E5E5;
    outline:none;
    ::placeholder{
        color:#E5E5E5;
    }
    border-radius: 15px;
    width:100%;
    height:35px;
`;

const SubmitButton = styled.button`
    margin-top:30px;
    border:none;
    width:350px;
    height:40px;
    background-color:#A352CC;
    border-radius:30px;
    color:white;
    font-weight:bold;
    font-size:18px;
    text-align:center;
`;

const Message = styled.input`
    border: none;
    background-color: white;
    color: red;
    width: 100%;
    text-align: center;
    margin-top: 30px;
`;

class FindId extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: false,
            secret: "",
            user_data: "",
            change: false,
        }
    }

    _searchId = async function () {
        const email = document.getElementsByName('search_id_email')[0].value.trim();
        if (!email) {
            document.getElementsByName('message')[0].value = '이메일을 입력해주세요';
            return;
        } else if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(email)) {
            //이메일 형식에 맞는 값이 들어왔는지 확인합니다.
            document.getElementsByName('message')[0].value = '올바르지 않은 이메일입니다. 다시 입력해주세요.';
            return;
        };

        const res = await axios.get('http://localhost:7000/mail/id', { params: { email: email } })
        console.log(res);
        if (res.data === false) {
            document.getElementsByName('message')[0].value = '일치하는 회원정보가 없습니다';
            return;
        }
        alert(email + '로 아이디가 발송되었습니다.');
        return this.setState({
            result: true,
            secret: res.data.secret,
            user_data: res.data,
        })
    }

    render() {
        return (
            <Page>
                <p style={{ 'color': 'gray', 'fontSize': '13px' }}>회원가입 시 등록한 이메일을 아래에 입력하세요.</p>
                <br />
                <form>

                    <InputComponent
                        name="search_id_email"
                        label="이메일"
                        placeholder="이메일"
                        type='text'
                        maxLength='20'
                    />
                    <div>
                        <SubmitButton type='button' value='아이디찾기' name='search_id_submit'
                            onClick={() => this._searchId()}
                        >
                            아이디 찾기
                        </SubmitButton>
                    </div>
                </form>
                <Message name='message' disabled />
            </Page>


        );
    }
}


export default FindId;