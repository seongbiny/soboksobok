import React from 'react';
import styled from "styled-components";

let 푸터디자인 = styled.footer`
    position: relative;
    width: 100%;
    height: 100%;
    margin-top: 50%;
    min-height: 278px;
    background-color: black;
    color: white;

`
let 링크디자인 = styled.p`
    padding: 28px 0px 10px 40px;
`
// let 링크각각 = styled.p`
//     &:hover{
//         color: blue;
//     }
// `
let 소개디자인 = styled.p`
    padding: 28px 0px 10px 40px;
`
function Footer() {
  return (
    <푸터디자인>
        <nav>
            <링크디자인>
                <a href='' target='_blank'><span>Notion</span></a>
                <span> | </span>
                <a href='' target='_blank'>Github</a>
            </링크디자인>
        </nav>

        <hr></hr>
        <소개디자인>
            <span>이름 : 소복소복</span><br/>
            <span>이메일 : </span><br/>
            <span>Copyright 2022. 소복소복. All Rights Reserved.</span>
        </소개디자인>

        
        
    </푸터디자인>

  );
}

export default Footer;
