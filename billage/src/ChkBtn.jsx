import React from 'react';
import axios from 'axios';
const ChkBtn=({value,name})=>{ 
    //value: 이메일과 닉네임의 값, name: email / nickname . 각 버튼을 실행할 때마다 value와 name에 들어감
    const onClick=(e)=>{
        e.preventDefault();
        axios.get("url")
        .then(function (response) {
             // response  
        }).catch(function (error) {
            // 오류발생시 실행
        }).then(function() {
            // 항상 실행
        });

        console.log(`value의 값은 ${value}, name의 값은 ${name}`); //이해를 돕기 위한 console.log
        
    }; //중복 확인 버튼 눌렀을 때 작동되는 함수
    return(
        <button onClick={onClick}>중복확인</button>
    );
};
export default ChkBtn;