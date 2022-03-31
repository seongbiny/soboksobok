import React from "react";
import styled from "styled-components";

let 빈값 = styled.td`
    background-color: #f9fafb;
    height:600px;
    text-align:center;
    vertical-align:center;

`;

function Blank(){

    return (
        <빈값>
            <h2>질문을 등록해주세요</h2>
        </빈값>
    )
}
export default Blank;
