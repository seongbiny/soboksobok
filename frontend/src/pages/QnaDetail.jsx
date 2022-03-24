import React from 'react';
import styled from "styled-components";
import { Container, Button } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import getAxios from '../api.js';
import { useParams } from 'react-router-dom';

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
    padding-right: 5%;

`
let 내용 = styled.div`
    background-color: #f9fafb;
    height: auto;
    padding-bottom: 5%;
    padding-top: 5%;
    padding-left: 5%;
    padding-right: 5%;
`
let 버튼들 = styled.div`
    text-align: right;
`
let 답변 = styled.h2`
    padding-left: 5%;
    padding-bottom: 2%;
`
let 답변내용 = styled.div`
    padding-left: 5%;
    padding-right: 5%;
    

`
function QnaDetail(props) {
    let state = useSelector((state) => state)
    const  qnaId  = useParams();
    const axios = getAxios();
    axios.get('/api/qna/mine/' + qnaId, {
        title: state.제목,
        content: state.내용
    })

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
                                    console.log(title)

                <제목>
                    { props.title }
                </제목>
                <hr></hr>

                <내용>
                    최근에 OOOO 복지혜택이 생겼는데 이거 추가해주실수 있나요?? <br></br>
                    감사합니다!!
                </내용>
                <hr></hr>
                <답변>
                    답변
                </답변>
                <답변내용>
                    안녕하세요 OOO님! 소복소복 서비스팀입니다. <br></br>
                    추가 요청해주신 복지혜택은 검토후에 추가하도록 하겠습니다. <br></br>
                    감사합니다.
                </답변내용>
            </글작성틀>
            {/* <button className="post-view-go-list-btn" onClick={() => history.goBack()}>목록</button> */}

        </Container>

    )
}
export default QnaDetail;