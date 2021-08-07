import React from "react";

const SubmitButton=({children, onClick})=>{
    return(
        <div>
        <button onClick={onClick}>{children}</button>
        </div>
    );
};
export default SubmitButton;