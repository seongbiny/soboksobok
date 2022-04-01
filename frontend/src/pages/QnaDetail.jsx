import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Container, Button } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import getAxios from '../api.js';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Comments from '../components/Comments'

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
let 답변입력 = styled.textarea`
    width: 90%;
    min-height: 120px;
    resize: none;
`
let 답변 = styled.h2`
    padding-left: 5%;
    padding-bottom: 2%;
`
let 답변내용 = styled.div`
    width: 100%
    margin-top: 5%;
    margin-bottom: 5%;

`
let 답변들 = styled.div`
    width: 100%
    margin-top: 5%;
    margin-bottom: 5%;
`
function QnaDetail(props) {
    let navigate = useNavigate();
    let state = useSelector((state) => state)
    const qnaId  = useParams().qnaId;

    const [댓글, 댓글값변경] = useState('');
    const [댓글들, 댓글들변경] = useState([]);

    const [new댓글, new댓글값변경] = useState('');
    const [new댓글들, new댓글들변경] = useState([]);
    const [editable, setEditable] = useState('false');
    
    const [qna, setQna] = useState({});
    const axios = getAxios();

    const deleteQna = async () => {
        await axios.delete(`/api/qna/mine/${qnaId}`);
        navigate(`/Qna/`)
    }
    const createComment =  () => {
        if (댓글 == '') {
            alert('댓글을 입력하세요')
        } else if (댓글 !== '') {
            axios.post(`/api/comment/${qnaId}`, {
                comment_content: 댓글,
            })
            .then(res => {
                댓글값변경('');
                getComment();
            })
        }
    }
    const updateComment = (Id) => {
        axios.patch(`/api/comment/${Id}`, {
            comment_content: 댓글
        })
        댓글값변경(댓글)
    }
    const getComment = () => {
        axios.get(`/api/qna/mine/${qnaId}`)
        .then(res => {
            console.log(res.data);
            setQna(res.data.body.success);
            댓글들변경(res.data.body.success.comments)
        })
        .catch(err => console.log(err))
    }
    useEffect(()=> {

        getComment();
        
    }, []);

    return (
        
        <Container>

            <글작성틀>

                <게시판이름>
                    Q&A
                </게시판이름>
                
                <버튼들>

                    <Button variant="primary" size="lg" onClick={(e)=> {
                        navigate(`/QnaPatch/${qnaId}`)

                    }}
                    
                    >수정</Button>{' '}
                    <Button variant="danger" size="lg" onClick={(e)=> {
                        deleteQna();

                    }}>삭제</Button>


                </버튼들>

                <hr></hr>

                <제목>
                    { qna.title }
                </제목>
                <hr></hr>

                <내용>
                    { ReactHtmlParser(qna.content)}
                </내용>
                <hr></hr>
                <답변>
                    답변
                </답변>
                <답변내용>
                    <답변입력 value={댓글}  onChange={(e) => {댓글값변경(e.target.value)}}>
                        
                    </답변입력>
                    <Button variant="dark" size="lg" onClick={(e)=> {
                        createComment();
                    }}
                    >등록</Button>              
                </답변내용>
                <답변들>
                    {
                        댓글들.map((a)=> {
                            return(
                                <Comments key={a.comment_id} id={a.comment_id} content={a.comment_content} getComment={getComment} />
                            )
                        })
                    }
                </답변들>
                
                <버튼들>
                <Link to = '/Qna'>
                    <Button variant="secondary" size="lg">목록</Button>
                </Link>
                </버튼들>
            </글작성틀>
            
        </Container>

    )
}
export default QnaDetail;