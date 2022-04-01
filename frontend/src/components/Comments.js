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

  const updateComment = Id => {
    axios.patch(`/api/comment/${Id}`, {
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
      <input type="text" value={comment} onChange={(e)=> (setComment(e.target.value))}></input>
      <button onClick={(e)=> {
        updateComment(props.id);
        setEditable(!editable)
      }}>저장</button>
    </div>
  );
};
export default Comments;
