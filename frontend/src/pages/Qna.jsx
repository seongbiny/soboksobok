import React, { useEffect, useState } from 'react';
import { Pagination, Table, Button, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { getAxios } from '../api.js';
import Blank from '../components/Qna/Blank.js';
import Write from '../components/Qna/BlankWrite.js';

let 표 = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 10%;
`;
let 제목 = styled.h1`
  text-align: center;
`;
let 글쓰기버튼 = styled.div`
  text-align: right;
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
  const token = localStorage.getItem('jwtToken');
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
  useEffect(() => {
    const fetchQnas = async () => {
      const request = await axios.get('/api/qna/mine/');

      const datas = request.data.body.success;
      // if (datas.length != 0) {
      //     const ids = await datas.map(data => data.id);
      //     const titles = await datas.map(data => data.title);
      //     const arr = Array.from({id:ids, title:titles})
      //     setQnas( arr );

      // }
      setQnas(datas);
    };
    fetchQnas();
    return () => setQnas([]);
  }, []);
  return (
    <Container style={{height:'auto', minHeight:'100%', paddingBottm:'30vh'}}>
      <표>
        <제목>Q&A 게시판</제목>
        {isLogin() ? (
          <Link to="/QnaCreate">
            <글쓰기버튼>
              <Button variant="secondary">글쓰기</Button>{' '}
            </글쓰기버튼>
          </Link>
        ) : (
          <Link to="/">
            <글쓰기버튼>
              <Button
                variant="secondary"
                onClick={() => {
                  alert('로그인 후 작성해주세요');
                }}
              >
                글쓰기
              </Button>{' '}
            </글쓰기버튼>
          </Link>
        )}

                <Table striped bordered hover>
                    <thead>
                        <표내용>
                        <th width='20%'>번호</th>
                        <th width='60%'>제목</th>
                        <th width='20%'>등록일</th>
                        </표내용>

                    </thead>

                    { qnas.length === 0 ? 
                        <tr>
                            <Blank></Blank>
                            <Write></Write>
                            <Blank></Blank>
                        </tr>
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
                        {/* {
                            qnas.map((a, i)=> {
                                return (
                                    <tr key={i} onClick={()=> {
                                        navigate(`/QnaDetail/${a.id}` ) 
                                    }} style={{cursor: 'pointer'}} >
                                        <중앙정렬 width='10%'>{i+1}</중앙정렬>
                                        <중앙정렬 width='70%'>{a.title}</중앙정렬>
                                        <중앙정렬 width='20%'>{a.qna_created_at[0]}년 {a.qna_created_at[1]}월 {a.qna_created_at[2]}일</중앙정렬>
                                    </tr>
                                )
                            })
                        } */}
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
