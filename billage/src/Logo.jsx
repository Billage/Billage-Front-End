import React from 'react';
import styled from 'styled-components';
const Img=styled.img`
    margin:20px;
`;
const Logo=()=>{

    return(
        <div>
        <Img src="img/Billage.png" alt="빌리지 로고" />
        </div>
    );
};
export default Logo;