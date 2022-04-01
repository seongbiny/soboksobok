<<<<<<< HEAD
import React, { useState } from "react";
import { getAxios } from "../api.js";
import { useParams } from "react-router-dom";

const Comments = props => {
  const axios = getAxios();
  const qnaId = useParams().qnaId;
  const [comment, setComment] = useState("");
  const { id, content } = props;
  const [editable, setEditable] = useState(false);

  const deleteComment = Id => {
    axios.delete(`/api/comment/${Id}`);
  }; // useEffect
=======
import React, { useEffect, useState } from 'react';
import getAxios from '../api.js';
import { useParams } from 'react-router-dom';
import { Comment } from '@mui/icons-material';

const Comments = props => {
  const axios = getAxios();
  const qnaId  = useParams().qnaId;
  const [comment, setComment] = useState('');
  const { id, content, getComment } = props;
  const [editable, setEditable] = useState(false);

  const deleteComment = async (Id) => {
    await axios.delete(`/api/comment/${Id}`, {

    })
    getComment();
  } 
>>>>>>> feature/comment

  const updateComment = Id => {
    axios.patch(`/api/comment/${Id}`, {
<<<<<<< HEAD
      comment_content: comment,
    });
    setComment(comment);
  };
  return editable === false ? (
    <div>
      <h4>{content}</h4>
      <button
        onClick={() => {
          deleteComment();
        }}
      >
        삭제
      </button>
=======
        comment_content: comment
    })
  }

  useEffect(()=> {
  
    setComment(content);
  }, [])

  return editable === false ? (
    <div>
      <h4>{comment}</h4>
      <button onClick={()=>{
        deleteComment(props.id);
      }}>삭제</button>
>>>>>>> feature/comment
      <button
        onClick={() => {
          setEditable(!editable);
          // setComment(props.댓글)
          console.log(comment)
        }}
      >
        수정
      </button>
      <hr />
    </div>
  ) : (
    <div>
<<<<<<< HEAD
      <input type="text" onChange={e => setComment(e.target.value)}></input>
      <button>저장</button>
=======
      <input type="text" value={comment} onChange={(e)=> (setComment(e.target.value))}></input>
      <button onClick={(e)=> {
        updateComment(props.id);
        setEditable(!editable)
      }}>저장</button>
>>>>>>> feature/comment
    </div>
  );
};
export default Comments;
