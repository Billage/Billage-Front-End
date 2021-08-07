//http://localhost:3000/signUp 에서 실행됩니다. port 번호는 바뀌어도 상관없고, 그 뒤에 /signUp만 붙여주세요
import React, {useCallback, useState} from 'react';
import Logo from './Logo';
import InputComponent from './InputComponent';
import SubmitButton from './SubmitButton';
import ChkBtn from './ChkBtn';
import axios from 'axios';
import Postcode from '@actbase/react-daum-postcode';
import Modal from 'react-modal';

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
        if(!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(email)){
            alert('올바르지 않은 이메일입니다. 다시 입력해주세요.');
            setEmail('');
            return;
        }
        if(!/^[A-Za-z0-9]{6,12}$/.test(pw)){
            alert('영문, 숫자 포함 6-12자리의 비밀번호를 입력해주세요.');
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
    return(
    <>
    <Logo />
    <form>
    <InputComponent 
        value={email} 
        onChange={setEmail}
        name="email"
        label="이메일" 
        placeholder="사용자 이메일"
         /> 
    <ChkBtn value={email} name="email"/>
    <InputComponent 
        value={pw}
        onChange={setPw}
        name="password"
        label="비밀번호" 
        placeholder="영문, 숫자 포함 6-12자리"
        type="password"/>
    <InputComponent  
        value={pwChk}
        onChange={onChangeChkPw}
        name="passwordChk" 
        label="비밀번호 확인" 
        type="password"/>
    {pwError&&<div>비밀번호가 일치하지 않습니다.</div>}
    <InputComponent   
        onChange={setNickname}
        value={nickname}
        name="nickname" 
        label="닉네임" />
    <ChkBtn value={nickname} name="nickname"/>
         <InputComponent   
        onChange={setShowAddress}
        value={showAddress}
        name="showAddress" 
        label="주소" 
        />
        <button onClick={modal}>주소찾기</button>
    {/* <div> */}
     <Modal isOpen={isModal}>
     <button onClick={modal}>X</button>
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
    <SubmitButton 
        onClick={onSubmitForm}>
        회원가입
    </SubmitButton>
    </form>
    </>
    );
}
export default SignUp;
