//http://localhost:3000/signUp 에서 실행됩니다. port 번호는 바뀌어도 상관없고, 그 뒤에 /signUp만 붙여주세요
import React, {useCallback, useState} from 'react';
import Logo from './Logo';
import axios from 'axios';
import Postcode from '@actbase/react-daum-postcode';
import Modal from 'react-modal';
import styled from "styled-components";

const Page=styled.body`
    margin:0;
    padding:20px;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const InputComponent=styled.input`
    border:none;
    outline:none;
    border-bottom: 1px solid #E5E5E5;
    ::placeholder{
        color:#E5E5E5;
    }
    width:250px;
    height:40px;
`;
const Label=styled.h2`  
font-size:14px;
color:#7D7D7D;
font-weight:600;
`;

const SubmitButton=styled.button`
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
const Btn=styled.button`
    border: 1px solid #EBCAFD;
    background-color:white;
    color:#EBCAFD;
    width:80px;
    height:30px;
    border-radius:5px;
    margin-left:12px;
`;
const CloseBtn=styled.button`
    position:absolute;
    right:20px;
    margin:5px 10px 0px 0px;
    padding:8px;
    background-color:white;
    border: none;
    color:#F79F81;
    border-radius:5px;
`;
const SignUp=()=>{
    const useInput = (initValue = null) =>{
        const [value,setter] = useState(initValue);
       
        const handler = (e) => {
            if(e) setter(e.target.value);
            else setter(initValue);
        };
        return [value,handler];
    };
   

    const [email,setEmail] = useInput('');
    const [pw,setPw] = useInput('');
    const [nickname,setNickname] = useInput('');
    const [showAddress,setShowAddress] =  useState('');
    const [fullAddress,setFullAddress]=useState('');
    //주소의 경우, 사용자에게 보여주는 것은 showAddress로 '##동'으로만 나오고, full 주소는 fullAddress에 저장됩니다.
    const [pwChk,setPwChk]=useState('');
    const [pwError,setPwError]=useState(false);
    const [chkEmail,setChkEmail]=useState(false);
    const [chkNickname,setChkNickname]=useState(false);
    // const pwChkRef=useRef();
    // const pwRef=useRef();
    
    const onSubmitForm=(e)=>{
        e.preventDefault();
        if(!(email&&pw&&pwChk&&nickname&&fullAddress)){
            alert(`모든 문항을 입력해주세요`);
            return;
        }
        else{
        //  입력하지 않은 문항 알려주는 것 추가 예정
        if(!/^[A-Za-z0-9]{6,12}$/.test(pw)){
            alert('영문, 숫자 포함 6-12자리의 비밀번호를 입력해주세요.');
            return;
        }
        if(!chkEmail){
            alert('이메일 중복확인을 완료해주세요.');
            return;
        }
        if(!chkNickname){
            alert('닉네임 중복확인을 완료해주세요.');
            return;
        }
        axios.post('url을 입력해주세요', {
                email: email,
                password: pw,
                nickname:nickname,
                address:fullAddress
            }
          ).then( (res) => {
            console.log(res);
          })
          .catch( (error)=> {
           console.log(error);
          });
    
       alert('가입을 환영합니다!');
        
    }
};
    const onChangeChkPw=(e)=>{
        if(!pw) {
            alert('비밀번호를 먼저 입력해주세요.');
            setPwChk('');
        }
        else{
        setPwError(e.target.value!==pw);
        setPwChk(e.target.value);
        }
    };
    const [isModal, setModal] = useState(false);
    const modal=(e)=>{
        e.preventDefault();
        if(isModal) setModal(false);
        else setModal(true);
    };
    const onClickChk=(e)=>{
        e.preventDefault();
        if(e.target.value==='email'){ //이메일 정보 받아오는 곳
            if(!email) {
                alert('입력창에 먼저 입력해주세요.');
                return;
            }else if(!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(email)){
                //이메일 형식에 맞는 값이 들어왔는지 확인합니다.
                alert('올바르지 않은 이메일입니다. 다시 입력해주세요.');
                setEmail('');
                return;
            }else{ //여기에서 axios 통신하시고, 아래 주석처리된 if문 괄호도 채워서 주석 해제해주세요
                axios.get('')
                .then((res)=> { //성공적으로 통신했을 때
                    // if() { //이미 저장된 이메일이 아니라면
                    //     alert('사용 가능한 이메일입니다.');
                    //     setChkEmail(true);
                    // } else{ //이미 저장된 이메일이라면 
                    //     alert('이미 저장된 이메일입니다.');
                    //     setEmail('');
                    // }
                })
                .catch((error)=> { console.log(error); }) //에러처리
            }
        }
    
        else if(e.target.value==='nickname'){ //닉네임 정보 받아오는 곳
            if(!nickname) {
                alert('입력창에 먼저 입력해주세요.');
                return;
            }
            else{ //여기에서 axios 통신하시고, 아래 주석처리된 if문 괄호도 채워서 주석 해제해주세요
                axios.get('')
                .then((res)=> { //성공적으로 통신했을 때
                    // if() { //이미 저장된 닉네임이 아니라면
                    //     alert('사용 가능한 닉네임입니다.');
                    //     setChkNickname(true);
                    // } else{ //이미 저장된 닉네임이라면 
                    //     alert('이미 저장된 닉네임입니다.');
                    //     setNickname('');
                    // }
                })
                .catch((error)=> { console.log(error); }) //에러처리
            }
        }

    };
    return(
    <Page >
    <Logo />
    <form>
    <Label>이메일</Label>
    <InputComponent 
        value={email} 
        onChange={setEmail}
        name="email"
        label="이메일" 
        placeholder="사용자 이메일"
         /> 
    <Btn onClick={onClickChk} value="email">중복확인</Btn>
    <Label>비밀번호</Label>
    <InputComponent 
        value={pw}
        onChange={setPw}
        name="password"
        label="비밀번호" 
        placeholder="영문, 숫자 포함 6-12자리"
        type="password"/>
    <Label>비밀번호 확인</Label>
    <InputComponent  
        value={pwChk}
        onChange={onChangeChkPw}
        name="passwordChk" 
        label="비12밀번호 확인" 
        type="password"/>
    {pwError&&<div style={{color : '#F79F81', fontSize: '10px'}}>비밀번호가 일치하지 않습니다.</div>}
    <Label>닉네임</Label>
    <InputComponent   
        onChange={setNickname}
        value={nickname}
        name="nickname" 
        label="닉네임" />
    <Btn onClick={onClickChk}  value="nickname">중복확인</Btn>
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
     <Modal isOpen={isModal} style={{width:'150px'}}>
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
export default SignUp;
