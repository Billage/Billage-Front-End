import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Postcode from '@actbase/react-daum-postcode';
import Modal from 'react-modal';
import styled from "styled-components";
import { DownOutlined, UpOutlined } from '@ant-design/icons';

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
    margin-bottom:10px;
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
const Head = styled.div`
    background-color:#A352CC;
    height:60px;
    text-align:center;
    color:#ffffff;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:bold;
    font-size:20px; 
`;

const MyInfoEdit = () => {
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [nickname, setNickname] = useState('');
    const [address, setAddress] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [pwChk, setPwChk] = useState('');
    const [pwError, setPwError] = useState(false);
    const [chkNickname, setChkNickname] = useState(false);
    const [change, setChange] = useState(false);
    const [showPwd, setShowPwd] = useState(false)
    const [kakao, setKakao] = useState(false);
    const [initNickname, setInitNickname] = useState('');
    const [initAddress, setInitAddress] = useState('');
    const [initFullAddress, setInitFullAddress] = useState('');

    useEffect(() => {  //처음 페이지가 실행될 때, 로그인 상태바뀔때, 사용자 주소 바뀔때 실행됨
        async function fetchUser() {
            try {
                const res = await axios.get("http://localhost:7000/auth", { withCredentials: true });
                if (res.data.provider === "kakao") {
                    setKakao(true);
                }
                setEmail(res.data.email);
                setId(res.data.userId);
                setInitNickname(res.data.nick); //중복될 경우를 대비하여 원래 닉네임을 저장해둡니다
                setInitAddress(res.data.address);
                setInitFullAddress(res.data.fullAddress);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser();
    }, []);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (!(nickname || fullAddress || pw || pwChk)) {
            alert(`문항을 입력해주세요`);
            return;
        }
        if (showPwd && !(pw && pwChk)) {
            alert(`변경할 비밀번호를 입력해주세요`);
            return;
        }
        else {
            if (showPwd && (!/^[A-Za-z0-9]{6,12}$/.test(pw))) {
                alert('영문, 숫자 포함 6-12자리의 비밀번호를 입력해주세요.');
                return;
            }
            if (!chkNickname && nickname) {
                alert('닉네임 중복확인을 완료해주세요.');
                return;
            }
            axios.post('http://localhost:7000/auth/update', {
                password: pw,
                nickname: (nickname ? nickname : initNickname),
                address: (address ? address : initAddress),
                fullAddress: (fullAddress ? fullAddress : initFullAddress),
            }, { withCredentials: true })
                .then((res) => {
                })
                .catch((error) => {
                    console.log(error);
                });
            alert('수정되었습니다');
            window.location.href = "/";
        }
    };
    const onChangeNick = (e) => {
        setNickname(e.target.value);
        setChange(true)
        console.log(change);
        console.log(nickname);
    };
    const onChangePw = (e) => {
        setPw(e.target.value);
    };
    const onChangeChkPw = (e) => {
        if (!pw) {
            alert('비밀번호를 먼저 입력해주세요.');
            setPwChk('');
        }
        else {
            setPwError(e.target.value !== pw);
            setPwChk(e.target.value);
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
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }

    };
    const clickPwd = (e) => {
        e.preventDefault();
        if (!showPwd) setShowPwd(true);
        else setShowPwd(false);

    };
    return (
        <>
            <Head style={{ marginBottom: '30px' }}>내 정보 수정</Head>
            <Page>
                <form>
                    {/* 이메일 부분에는 사용자 이메일이 들어오고, 수정은 불가합니다 */}
                    <Label>이메일</Label>
                    <InputComponent
                        value={kakao ? "카카오 로그인시 변경할 수 없는 사항입니다" : email}
                        name="email"
                        label="이메일"
                        placeholder="사용자 이메일"
                        readOnly
                        style={{ color: '#7D7D7D', fontStyle: 'italic' }} />
                    {/* 아이디 부분에는 사용자 아이디가 들어오고, 수정은 불가합니다 */}
                    <Label>아이디</Label>
                    <InputComponent
                        value={kakao ? "카카오 로그인시 변경할 수 없는 사항입니다" : id}
                        name="id"
                        label="아이디"
                        placeholder="사용자 아이디"
                        readOnly
                        style={{ color: '#7D7D7D', fontStyle: 'italic' }} />
                    {/* 카카오 로그인 확인 */}
                    {!kakao ?
                        <div>
                            <div onClick={clickPwd} style={!showPwd ? { marginBottom: '20px' } : null}>
                                <Label style={{ display: 'inline' }}>비밀번호 변경</Label>
                                <div style={{ display: 'inline-block', color: '#7D7D7D', fontSize: '12px', fontStyle: 'bold', textAlign: 'center', marginLeft: '5px' }}>
                                    {/* 비밀번호 변경 칸 누를 때마다 아이콘 바뀜*/}  {showPwd ? <UpOutlined /> : <DownOutlined />}
                                </div>
                            </div>
                            {/* 비밀번호 변경 부분 눌렀는지 여부 확인 후 보임*/}
                            {showPwd ? <div>
                                <InputComponent
                                    value={pw}
                                    onChange={onChangePw}
                                    name="newPassword"
                                    label="새로운 비밀번호"
                                    placeholder="영문, 숫자 포함 6-12자리"
                                    type="password"
                                />
                                <Label>비밀번호 확인</Label>
                                <InputComponent
                                    value={pwChk}
                                    onChange={onChangeChkPw}
                                    name="passwordChk"
                                    label="비밀번호 확인"
                                    type="password" />
                                {pwError && <div style={{ color: '#F79F81', fontSize: '10px' }}>비밀번호가 일치하지 않습니다.</div>}
                            </div> : null} {/* 비밀번호 변경  닫기*/}
                        </div> : null}  {/* 카카오 로그인 확인 닫기 */}
                    <Label>닉네임</Label>
                    <InputComponent
                        onChange={onChangeNick}
                        value={nickname}
                        placeholder={initNickname}
                        name="nickname"
                        label="닉네임" />
                    <Btn onClick={onClickChk} value="nickname">중복확인</Btn>
                    <Label>주소</Label>
                    <InputComponent
                        onChange={setAddress}
                        value={address ? address : initAddress}
                        name="address"
                        label="주소"
                        readOnly
                    />
                    <Btn onClick={modal}>주소찾기</Btn>
                    {/* <div> */}
                    <Modal isOpen={isModal} style={{ width: '150px' }}>
                        <Postcode
                            style={{ width: 320, height: 320 }}
                            jsOptions={{ animated: true, hemaileMapBtn: true }}
                            onSelected={data => {
                                setAddress(data.bname);
                                setFullAddress(data.address);
                                setModal(false);
                            }}
                        />
                        <CloseBtn onClick={modal}>X</CloseBtn>
                    </Modal>
                    {/* </div> */}
                    <div>
                        <SubmitButton
                            onClick={onSubmitForm}>
                            수정
                        </SubmitButton>
                    </div>
                </form>
            </Page>
        </>
    );
}

export default MyInfoEdit;