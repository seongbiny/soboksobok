import React, { useEffect, useState } from 'react';
import { getAxios } from '../api.js';
import { useParams } from 'react-router-dom';
import { Comment } from '@mui/icons-material';
import { Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
let CommentContent = styled.div`
    display: flex;
    margin-bottom: 5%;
`;
let CommentSize = styled.p`
    font-size: medium;
`
let DatePlace = styled.div`
  display: grid;
  justify-content: space-between;
  float:right;
`
let NamePlace = styled.div`
  margin-left: 100%;
`
const Comments = props => {
  const axios = getAxios();
  const qnaId  = useParams().qnaId;
  const [comment, setComment] = useState('');
  const { id, content, getComment, name, getDate} = props;
  const [editable, setEditable] = useState(false);
  const [username, setUsername] = useState('');

  const [writedate, setWritedate] = useState([]);


  const [show, setShow] = useState(false);
  const [showDone, setShowDone] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteComment = async (Id) => {
    await axios.delete(`/api/comment/${Id}`, {

    })
    getComment();
  } 

  const updateComment = Id => {
    axios.patch(`/api/comment/${Id}`, {
        comment_content: comment,
        
    })
    // console.log(writedate);
    // console.log('getDate')
    // console.log(getDate);
  }
 
  useEffect(()=> {
    console.log(getDate)
    console.log(123132)
    setComment(content);
    setUsername(name);

  }, [])
  useEffect(()=> {
    setWritedate(getDate);
    console.log('확인', writedate)
  },[])

  return editable === false ? (
    <div>
      <CommentSize>
        {comment}
      </CommentSize>

        <DatePlace>
          작성자 : {username} / 
        </DatePlace>

         
      <Button
        variant="secondary"
        size="sm"
        onClick={() => {
          setEditable(!editable);
        }}
      >
        수정
      </Button>
      {' '}
      
      <Button
        variant="danger"
        size="sm" 
        onClick={()=>{
          handleShow();
        // deleteComment(props.id);
      }}>삭제</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>댓글 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>댓글 삭제 하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              handleClose();
              deleteComment(props.id);
              setShowDone(true);
            }}
          >
            삭제
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
      <hr />
    </div>
  ) : (
    <CommentContent>
      <input type="text" value={comment} onChange={(e)=> (setComment(e.target.value))}></input>
      <Button 
        variant="secondary"
        size="sm"
        onClick={(e)=> {
        updateComment(props.id);
        setEditable(!editable)
      }}>저장</Button>

    </CommentContent>
    

    
  );
};
export default Comments;
