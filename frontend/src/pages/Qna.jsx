import React from 'react';
import { Pagination, Table, Button, Container } from 'react-bootstrap';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import getAxios from '../api.js';

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
let 표내용 = styled.tr`
    text-align: center;
`
let 중앙정렬 = styled.td`
    text-align: center;
`


function isLogin() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  
function Qna(props){
    let state = useSelector((state) => state)
    const axios = getAxios();
    axios.get('/api/qna/mine/') 
    return (

        <Container>
            <표>
                <제목>
                    Q&A 게시판
                </제목>
                {isLogin() ? (
                    <Link to = '/QnaCreate'>
                    <글쓰기버튼>
                        <Button variant="secondary">글쓰기</Button>{' '}
                    </글쓰기버튼>
                    </Link>
                ):(                   
                    
                    <Link to = '/'>
                    <글쓰기버튼>
                        <Button variant="secondary" onClick={() => {
                        alert('로그인 후 작성해주세요')
                        }}>글쓰기</Button>{' '}
                        
                    </글쓰기버튼>
                    </Link>
                )}

                <Table striped bordered hover>
                    <thead>
                        <표내용>
                        <th width='10%'>번호</th>
                        <th width='70%'>제목</th>
                        <th width='20%'>등록일</th>
                        </표내용>

                    </thead>
                    <tbody>
                        {
                            state.map((a, i)=> {
                                return (
                                    <tr key={i} >
                                        <중앙정렬 width='10%'>{i+1}</중앙정렬>
                                        <td width='70%'>{a.title}</td>
                                        <중앙정렬 width='20%'>{a.year}년 {a.month+1}월 {a.day}일</중앙정렬>
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

// function state를props화(state){  //redux store 데이터 가져와서 props로 변환해주는 함수
//     return {
//         state : state

//     }
// }

// export default connect(state를props화)(Qna)
export default Qna;