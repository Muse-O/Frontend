import React, { useRef, useState } from "react";
import { useDeletecomments } from "../../../hooks/artgram/newArtgram/useDeletecomments";
import { usePostingtime } from "../../../hooks/artgram/usePostingtime";
import { cookies } from "../../../shared/cookies";
import jwtDecode from "jwt-decode";
import * as DetailModal from "./ArtgramDetailModalCss";
import { useUpdatecomments } from "../../../hooks/artgram/newArtgram/useUpdatecomments";
import { usePostReply } from "../../../hooks/artgram/newArtgram/usePostReply";

function ArtgramDeteilCommentEdit({ artgramId, comment }) {
  const token = cookies.get("access_token") || null;
  let email;
  if (token) {
    const getemail = jwtDecode(token);
    email = getemail.email;
  }

  const [timehandle] = usePostingtime();
  // 댓글 삭제
  const { deleteHandle } = useDeletecomments();
  const [edit, setEdit] = useState(false);

  // 댓글 수정
  const { updateHandle } = useUpdatecomments();
  const [updatecomment, setUpdateComment] = useState("");
  const updateCommentsHandle = (e) => {
    e.preventDefault();
    updateHandle(artgramId, comment.commentId, updatecomment);
    setEdit((pre) => !pre);
    setUpdateComment("");
  };

  // 답글 입력하기
  const [replyState, setReplyState] = useState(false);
  const [reply, setReply] = useState("");
  const {replyHandle} = usePostReply(setReply, setReplyState)

  return (
    <>
      <DetailModal.CommentsInnerText>
        <div className="profileNickname">
          <p>{comment.profileNickname}</p>
        </div>
        <div className="artgarmcomment">
          {!edit ? (
            <p>{comment.comment}</p>
          ) : (
            <form onSubmit={updateCommentsHandle}>
              <input
                value={updatecomment}
                onChange={(e) => setUpdateComment(e.target.value)}
                placeholder={comment.comment}
              />
            </form>
          )}
        </div>
      </DetailModal.CommentsInnerText>

      <DetailModal.CommentsSettings>
        <p className="artgarmcommentTime">{timehandle(comment.createdAt)}</p>
        {!replyState ? (
          <p className="commentwrite" onClick={() => setReplyState((pre) => !pre)}>
            답글달기
          </p>
        ) : (
          <form onSubmit={(e)=> replyHandle(e, artgramId, comment.commentId, reply)}>
            <input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="답글을 입력해주세요." />
          </form>
        )}
        {email === comment.userEmail && (
          <>
            {!edit ? (
              <p
                className="commentwrite"
                onClick={() => {
                  setEdit((pre) => !pre);
                }}
              >
                수정
              </p>
            ) : (
              <p className="commentwrite" onClick={updateCommentsHandle}>
                수정완료
              </p>
            )}
            <p
              className="commentwrite"
              onClick={() => deleteHandle(artgramId, comment.commentId)}
            >
              삭제
            </p>
          </>
        )}
      </DetailModal.CommentsSettings>
      <DetailModal.Reply>
        <div>
          <hr />
        </div>
        <div>예정기능 답글보기(1) </div>
      </DetailModal.Reply>
    </>
  );
}

export default ArtgramDeteilCommentEdit;
