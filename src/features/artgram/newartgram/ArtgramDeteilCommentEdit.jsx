import React, { useEffect, useState } from "react";
import { useDeletecomments } from "../../../hooks/artgram/newArtgram/useDeletecomments";
import { usePostingtime } from "../../../hooks/artgram/usePostingtime";
import { cookies } from "../../../shared/cookies";
import jwtDecode from "jwt-decode";

function ArtgramDeteilCommentEdit({ artgramId, comment }) {
  const token = cookies.get("access_token") || null
  let email;
  if(token) {
    const getemail = jwtDecode(token)
    email = getemail.email
  }

  const [timehandle] = usePostingtime();
  // 댓글 삭제
  const { deleteHandle } = useDeletecomments();
  const [edit, setEdit] = useState(false);
  // useEffect(()=>{
  //   const token = cookies.get("access_token")
  //   console.log(token);
  // },[])

  return (
    <>
      <div>
        <p className="profileNickname">{comment.profileNickname}</p>
        <p className="artgarmcomment">
          {!edit ? (
            `${comment.comment}`
          ) : (
            <input placeholder={comment.comment} />
          )}
        </p>
      </div>
      <div>
        <p className="artgarmcommentTime">{timehandle(comment.createdAt)}</p>
        <p className="commentwrite" onClick={() => alert("기능구현중")}>
          답글달기
        </p>
        {email === comment.userEmail && (
          <>
            <p className="commentwrite" onClick={() => setEdit((pre) => !pre)}>
              수정
            </p>
            <p
              className="commentwrite"
              onClick={() => deleteHandle(artgramId, comment.commentId)}
            >
              삭제
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default ArtgramDeteilCommentEdit;
