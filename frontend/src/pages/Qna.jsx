import React from 'react';
import { Pagination, Table, Button } from 'react-bootstrap';
import styled from "styled-components";

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
`
let 페이지번호 = styled.div`
    display: grid;
    justify-content: center;
`
function Qna(){
    return (

        <div>
            <표>
                <제목>
                    Q&A 게시판
                </제목>
                <글쓰기버튼>
                    <Button variant="secondary">글쓰기</Button>{' '}
                </글쓰기버튼>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        </tr>
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


        </div>

    )
}

export default Qna;