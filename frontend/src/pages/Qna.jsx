import React, { useEffect, useState } from 'react';
import { Pagination, Table, Button, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { getAxios } from '../api.js';
import Blank from '../components/Qna/Blank.js';
import Write from '../components/Qna/BlankWrite.js';
import '../CSS/app.css';
let 표 = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 10%;
  font-family: 'Noto Sans KR', sans-serif;
`;
let 제목 = styled.h1`
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
`;
let 글쓰기버튼 = styled.span`
  float: right;
  margin-bottom: 1%;
`;
let 페이지번호 = styled.div`
  display: grid;
  justify-content: center;
`;
let 표내용 = styled.tr`
  text-align: center;
`;
let 중앙정렬 = styled.td`
  text-align: center;
`;

function isLogin() {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    return false;
  }
}
function Qna(props) {
  let navigate = useNavigate();
  let state = useSelector((state) => state);
  let [qnas, setQnas] = useState([]);
  const axios = getAxios();

  const fetchQnas = async () => {
    const request = await axios.get('/api/qna/mine/');

        const datas = request.data.body.success;
        setQnas([...datas]) 
    }
    const checkLogin = () => {
        if (!isLogin()) {
            alert('로그인해주세요')
            navigate(`/` )
        } else {
            fetchQnas()
        }
    }
    useEffect(()=>{
        checkLogin();
    }, []);

    return (
        <Container>

        {isLogin() ? (
            <표>
            <제목>
                Q&A 게시판
            </제목>

                <Link to = '/QnaCreate'>
                <글쓰기버튼 >
                    <Button variant="secondary">글쓰기</Button>{' '}
                </글쓰기버튼>
                </Link>

            <Table striped bordered hover >
                <thead>
                    <표내용>
                    <th width='20%'>번호</th>
                    <th width='60%'>제목</th>
                    <th width='20%'>등록일</th>
                    </표내용>

                </thead>

                { qnas.length === 0 ? 
                    <tbody>
                        <tr>
                        {/* <Blank></Blank> */}
                        <Write></Write>
                        {/* <Blank></Blank> */}
                        </tr>


                    </tbody>

                    : 
                    <tbody>
                    {   
                        qnas.map((a, i)=> {
                            return (
                                <tr key={i} onClick={()=> {
                                    navigate(`/QnaDetail/${a.id}` ) 
                                }} style={{cursor: 'pointer'}} >
                                    <중앙정렬 width='20%'>{i+1}</중앙정렬>
                                    <중앙정렬 width='60%'>{a.title}</중앙정렬>
                                    <중앙정렬 width='20%'>{a.qna_created_at[0]}년 {a.qna_created_at[1]}월 {a.qna_created_at[2]}일</중앙정렬>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                }

            </Table>



        </표>
        ): (
            // navigate(`/` )
            <div></div>
        )}

        </Container>




    )
}

export default Qna;
