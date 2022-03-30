import React, { useState } from "react";

const Comments = props => {
  const { id, content } = props;
  const [editable, setEditable] = useState(false);

  return editable === false ? (
    <div>
      <h4>{content}</h4>
      <button>삭제</button>
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
      <input></input>
      <button>저장</button>
    </div>
  );
};
export default Comments;
