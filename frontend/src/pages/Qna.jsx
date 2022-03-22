import React from 'react';
import { Pagination, Table, Button, Container } from 'react-bootstrap';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

let 표 = styled.div`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 10%;

`
let 제목 = styled.h1`
    text-align: center;
`
let 글쓰기버튼 = styled.div`
    text-align: right;
    margin-bottom: 1%;
`
let 페이지번호 = styled.div`
    display: grid;
    justify-content: center;
`
function Qna(props){
    let state = useSelector((state) => state)

    return (

        <Container>
            <표>
                <제목>
                    Q&A 게시판
                </제목>
                <Link to = '/QnaCreate'>
                    <글쓰기버튼>
                        <Button variant="secondary">글쓰기</Button>{' '}
                    </글쓰기버튼>
                </Link>


                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state.reducer.map((a, i)=> {
                                return (
                                    <tr key={i}>
                                        <td>{a.id}</td>
                                        <td>{a.title}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <페이지번호>
                    <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item active>{1}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </페이지번호>


            </표>
        </Container>




    )
}

export default Qna;