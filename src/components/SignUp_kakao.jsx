import React, { useCallback, useState } from 'react';
import Logo from './Logo';
import axios from 'axios';
import Postcode from '@actbase/react-daum-postcode';
import Modal from 'react-modal';
import styled from "styled-components";

const Page = styled.body`
    margin:0;
    padding:20px;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const InputComponent = styled.input`
    border:none;
    outline:none;
    border-bottom: 1px solid #E5E5E5;
    ::placeholder{
        color:#E5E5E5;
    }
    width:250px;
    height:40px;
`;
const Label = styled.h2`  
font-size:14px;
color:#7D7D7D;
font-weight:600;
`;

const SubmitButton = styled.button`
    margin-top:30px;
    border:none;
    width:350px;
    height:50px;
    background-color:#A352CC;
    border-radius:5px;
    color:white;
    font-weight:bold;
    font-size:18px;
    text-align:center;
`;
const Btn = styled.button`
    border: 1px solid #EBCAFD;
    background-color:white;
    color:#EBCAFD;
    width:80px;
    height:30px;
    border-radius:5px;
    margin-left:12px;
`;
const CloseBtn = styled.div`
    position:fixed;
    top:0;
    right:0;
    height:20px;
    margin:5px 10px 0px 0px;
    padding:auto;
    background:none;
    color:#E5E5E5;
    width:20px;
    font-weight:bold;
    text-align:center;
    border-radius:2px;
    cursor:pointer;
`;
const SignUp_kakao = (props) => {
    const useInput = (initValue = null) => {
        const [value, setter] = useState(initValue);

        const handler = (e) => {
            if (e) setter(e.target.value);
            else setter(initValue);
        };
        return [value, handler];
    };



    const [nickname, setNickname] = useInput('');
    const [showAddress, setShowAddress] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    //주소의 경우, 사용자에게 보여주는 것은 showAddress로 '##동'으로만 나오고, full 주소는 fullAddress에 저장됩니다.
    const [chkNickname, setChkNickname] = useState(false);
    // const pwChkRef=useRef();
    // const pwRef=useRef();

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (!(nickname && fullAddress)) {
            alert(`모든 문항을 입력해주세요`);
            return;
        }
        else {
            //  입력하지 않은 문항 알려주는 것 추가 예정
            if (!chkNickname) {
                alert('닉네임 중복확인을 완료해주세요.');
                return;
            }
            axios.post('http://localhost:7000/auth/join/kakao', {
                nickname: nickname,
                address: showAddress,
                fullAddress: fullAddress,
            },
                { withCredentials: true }
            ).then((res) => {
                console.log(res);
            })
                .catch((error) => {
                    console.log(error);
                });
            alert('가입을 환영합니다!');
            props.history.push('/');
        }
    };

    const [isModal, setModal] = useState(false);
    const modal = (e) => {
        e.preventDefault();
        if (isModal) setModal(false);
        else setModal(true);
    };
    const onClickChk = (e) => {
        e.preventDefault();
        if (e.target.value === 'nickname') { //닉네임 정보 받아오는 곳
            if (!nickname) {
                alert('입력창에 먼저 입력해주세요.');
                return;
            }
            else { //여기에서 axios 통신하시고, 아래 주석처리된 if문 괄호도 채워서 주석 해제해주세요
                axios.get('http://localhost:7000/auth/nick', { params: { nick: nickname } })
                    .then((res) => { //성공적으로 통신했을 때
                        if (!res.data) { //이미 저장된 닉네임이 아니라면
                            alert('사용 가능한 닉네임입니다.');
                            setChkNickname(true);
                        } else { //이미 저장된 닉네임이라면 
                            alert('이미 사용 중인 닉네임입니다.');
                            setNickname('');
                        }
                    })
                    .catch((error) => { console.log(error); }) //에러처리
            }
        }

    };
    return (
        <Page >
            <Logo />
            <form>
                <Label>이메일</Label>
                <InputComponent
                    label="이메일"
                    placeholder="카카오 로그인입니다."
                    readOnly />
                <Label>비밀번호</Label>
                <InputComponent
                    label="비밀번호"
                    placeholder="카카오 로그인입니다."
                    readOnly />
                <Label>비밀번호 확인</Label>
                <InputComponent
                    label="비밀번호 확인"
                    placeholder="카카오 로그인입니다."
                    readOnly />
                <Label>닉네임</Label>
                <InputComponent
                    onChange={setNickname}
                    value={nickname}
                    name="nickname"
                    label="닉네임" />
                <Btn onClick={onClickChk} value="nickname">중복확인</Btn>
                <Label>주소</Label>
                <InputComponent
                    onChange={setShowAddress}
                    value={showAddress}
                    name="showAddress"
                    label="주소"
                    readOnly
                />
                <Btn onClick={modal}>주소찾기</Btn>
                {/* <div> */}
                <Modal isOpen={isModal} style={{ width: '150px' }}>
                    <CloseBtn onClick={modal}>X</CloseBtn>
                    <Postcode
                        style={{ width: 320, height: 320 }}
                        jsOptions={{ animated: true, hemaileMapBtn: true }}
                        onSelected={data => {
                            setShowAddress(data.bname);
                            setFullAddress(data.address);
                            setModal(false);
                        }}
                    />
                </Modal>
                {/* </div> */}
                <div>
                    <SubmitButton
                        onClick={onSubmitForm}>
                        회원가입
                    </SubmitButton>
                </div>
            </form>
        </Page>
    );
}
export default SignUp_kakao;