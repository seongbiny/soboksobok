import React, { Component } from 'react';
import styled from "styled-components";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../CSS/qnacreate.css';

let 게시판이름 = styled.h1`
    text-align: center;
    margin-bottom: 5%;
`
let 글작성틀 = styled.div`
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 5%;
`


function QnaCreate(){
    return (
        <글작성틀>
            <게시판이름>
                Q&A
            </게시판이름>
            <CKEditor
                className="cke_editor_editor .cke_contents"
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

        </글작성틀>

        
    )
}
export default QnaCreate;