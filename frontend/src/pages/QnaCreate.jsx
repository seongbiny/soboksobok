import React, { Component } from 'react';
import styled from "styled-components";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Container } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../CSS/qnacreate.css';
import { useState } from 'react';
import getAxios from '../api.js';

let 게시판이름 = styled.h1`
    text-align: center;
    margin-bottom: 5%;
`

let 게시글제목 = styled.div`

    width: 100%;
    margin-bottom: 2%;

`
let 글작성틀 = styled.div`
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 5%;
`
let 버튼위치 = styled.div`
    padding-top: 3%;
    text-align: center;
`

function QnaCreate(props){
    let state = useSelector((state) => state)
    let [제목, 제목값변경] = useState('');
    let [내용, 내용값변경] = useState('');
    let dispatch = useDispatch();
    let date = new Date();
    let 글작성연도 = date.getFullYear();
    let 글작성월 = date.getMonth();
    let 글작성일 = date.getDate();
    return (
        <Container>
            <글작성틀>
                <게시판이름>
                    Q&A
                </게시판이름>
                <게시글제목>
                    <p>제목</p> 
                    <input type="text" maxLength='50' style={ { width: "100%"}} onChange={ (e) => {제목값변경(e.target.value)} }/>

                </게시글제목>
                <p>내용</p> 
                <CKEditor
                    editor={ ClassicEditor }
                    // data="<p>Hello from CKEditor 5!</p>"
                    // onReady={ editor => {
                    //     // You can store the "editor" and use when it is needed.
                    //     // console.log( 'Editor is ready to use!', editor );
                    // } }
                    // onChange={ ( event, editor ) => {
                    //     const data = editor.getData();
                    //     // console.log( { event, editor, data } );
                    // } }
                    // onBlur={ ( event, editor ) => {
                    //     // console.log( 'Blur.', editor );
                    // } }
                    // onFocus={ ( event, editor ) => {
                    //     // console.log( 'Focus.', editor );
                    // } }
                    onChange={ (event, editor) => {
                        const data = editor.getData().replace(/<((p|\/p)([^>]*)([^a-z]*)(&nbsp;*|br))([^>]*)>|<(p|\/p)([^>]*)>+([\<\/div>]*)/gi,"");
                        
                        내용값변경(data)
                    }}
                    
                />
                
                <버튼위치>
                <Link to = '/Qna'>
                    <Button variant="secondary" size="lg">취소</Button>
                </Link>
                {' '}
                <Link to = '/Qna'>
                <Button variant="primary" size="lg" onClick={(e) => {
                    // dispatch({ type: '항목추가',payload: { title:제목, year:글작성연도, month:글작성월, day:글작성일 }});
                    const axios = getAxios();
                    axios.post('/api/qna/mine', {
                        title: 제목,
                        content: 내용,
                    })
                }}>등록</Button>

                </Link>
 
                </버튼위치>

            </글작성틀>

        </Container>


        
    )
}
export default QnaCreate;
// function state를props화(state){  //redux store 데이터 가져와서 props로 변환해주는 함수

//     return {
//         state: state

//     }
// }

// export default connect(state를props화)(QnaCreate)