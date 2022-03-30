import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Container, Button } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import getAxios from '../api.js';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

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
function QnaDetail() {
    let navigate = useNavigate();
    let state = useSelector((state) => state)
    const qnaId  = useParams().qnaId;
    // const commentId = useParams().commentId;

    const [댓글, 댓글값변경] = useState('');
    const [댓글들, 댓글들변경] = useState([]);
    const [new댓글, new댓글값변경] = useState('');
    const [new댓글들, new댓글들변경] = useState([]);
    const [editable, setEditable] = useState(false);
    
    const [qna, setQna] = useState({});
    const axios = getAxios();
    const createComment = () => {
        if (댓글 == '') {
            alert('댓글을 입력하세요')
        } else if (댓글 !== '') {
            axios.post(`/api/comment/${qnaId}`, {
                comment_content: 댓글,
            })
            댓글값변경('');
        }
    }
    // console.log(댓글들)
    const deleteComment = (Id) => {
        axios.delete(`/api/comment/${Id}`)
    } // useEffect
    const updateComment = (Id) => {
        axios.patch(`/api/comment/${Id}`, {
            comment_content: new댓글
        })
        댓글값변경(Id.comment_content)
    }
    const setEdit = () => {
        if (editable === false) {
            setEditable(!editable)
        } else if (editable === true) {
            setEditable(!editable)
        }
    }
    useEffect(()=> {
        // const fetchQnas = async () => {
        //     const request = await axios.get(`/api/qna/mine/${qnaId}/`);
        //     const  datas = request.data.body.success;

        //     setQna(datas)
        // }
        // fetchQnas();
        // return () => setQna([]);
        // 이거 async 로 바꾸면 글 쓰고 바로 글 목록에 표시가 안된다
        axios.get(`/api/qna/mine/${qnaId}`)
            .then(res => {
                // console.log(res.data);
                setQna(res.data.body.success);
                댓글들변경(res.data.body.success.comments)
            })
            .catch(err => console.log(err))
        
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
                    <Link to ='/Qna'>
                    <Button variant="danger" size="lg" onClick={(e)=> {
                        const axios = getAxios();
                        axios.delete(`/api/qna/mine/${qnaId}`)
                        navigate(`/Qna/`)

                    }}>삭제</Button>

                    </Link>

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
                    <답변입력 value={댓글} onChange={(e) => {댓글값변경(e.target.value)}}>
                        
                    </답변입력>
                    <Button variant="dark" size="lg" onClick={(e)=> {
                        createComment();
                    }}
                    >등록</Button>              
                </답변내용>
                <답변들>
                    {
                        댓글들.map((a, i)=> {
                            return(
                                <div key={i}>
                                    
                                    <h4>{a.comment_content}</h4>
                                    <button onClick={(e)=> {
                                        deleteComment(a.comment_id);
                                        // getComment();
                                    }}>
                                    x
                                    </button>
                                    <button onClick={(e)=> {
                                        setEdit();
                                        console.log(editable)
                                        // updateComment(a.comment_id)
                                    }}>
                                    o
                                    </button>
                                    <hr />
                                </div>
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
            {/* <button className="post-view-go-list-btn" onClick={() => history.goBack()}>목록</button> */}
            
        </Container>

    )
}
export default QnaDetail;