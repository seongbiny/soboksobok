import React, { Component } from 'react';
import styled from "styled-components";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Container } from 'react-bootstrap';
import '../CSS/qnacreate.css';

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

function QnaCreate(){
    return (
        <Container>
            <글작성틀>
                <게시판이름>
                    Q&A
                </게시판이름>
                <게시글제목>
                    <p>제목</p> 
                    <input type="text" style={ { width: "100%"}} />
                </게시글제목>
                <p>내용</p> 
                <CKEditor
                    editor={ ClassicEditor }
                    // data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        // console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        // console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        // console.log( 'Focus.', editor );
                    } }
                />
                <버튼위치>
                <Button variant="secondary" size="lg">취소</Button>{' '}
                <Button variant="primary" size="lg">등록</Button>{' '}
                </버튼위치>

            </글작성틀>

        </Container>


        
    )
}
export default QnaCreate;