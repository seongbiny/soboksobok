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

  const updateComment = Id => {
    axios.patch(`/api/comment/${Id}`, {
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
      <button
        onClick={() => {
          setEditable(!editable);
        }}
      >
        수정
      </button>
      <button>저장</button>
      <hr />
    </div>
  ) : (
    <div>
      <input type="text" onChange={e => setComment(e.target.value)}></input>
      <button>저장</button>
    </div>
  );
};
export default Comments;
