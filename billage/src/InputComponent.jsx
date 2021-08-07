import React, {useState, useCallback}from 'react';

const InputComponent=({placeholder,  onChange, label, name, type,value,readOnly})=>{
    // const [value,setter] = useState(value);
   
    //     const onChange = useCallback((e) => {
    //         // alert('입력중');d
    //         setter(e.target.value);
    //     },[value]);
      
    return(
    <>
    <h2>{label}</h2>
    <input value={value} placeholder={placeholder} onChange={onChange} type={type}   readOnly={name==='showAddress'}/>
    </> 
    );
};
export default InputComponent;