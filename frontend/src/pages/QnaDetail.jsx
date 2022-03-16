import React from 'react';
import styled from "styled-components";
import { Container, Button } from 'react-bootstrap';

let 글작성틀 = styled.div`
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 5%;
`
let 게시판이름 = styled.h1`
    text-align: center;
    margin-bottom: 5%;
`
let 제목 = styled.div`
    padding-left: 5%;
`
let 내용 = styled.div`
    background-color: #f9fafb;
    height: auto;
    padding-bottom: 5%;
    padding-top: 5%;
    padding-left: 5%;
`
let 버튼들 = styled.div`
    text-align: right;
`
function QnaDetail() {

    return (
        
        <Container>

            <글작성틀>

                <게시판이름>
                    Q&A
                </게시판이름>
                
                <버튼들>
                    <Button variant="primary" size="lg">수정</Button>{' '}
                    <Button variant="danger" size="lg">삭제</Button>
                </버튼들>

                <hr></hr>

                <제목>
                        제목 들어갈 곳
                </제목>
                <hr></hr>

                <내용>
                    내용들어갈 곳 <br></br>
                    hihi
                </내용>
            </글작성틀>
            {/* <button className="post-view-go-list-btn" onClick={() => history.goBack()}>목록</button> */}

        </Container>

    )
}
export default QnaDetail;