import React, { useEffect, useRef, useState } from 'react'
// import CSS & icons & png ------------------------------------------------------------------------------/
import * as Comment from '../css/ArtgramDetailCss'
// import Library-----------------------------------------------------------------------------------------/
import { useRecoilValue } from 'recoil';
import { decodeEmail } from '../../login/loginTokenStore';
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import {usePostReply} from '../../../hooks/artgram/usePostReply'
import {usePostingtime} from '../../../hooks/artgram/usePostingtime'
import {useDeletecomments} from '../../../hooks/artgram/useDeletecomments'
import {useUpdatecomments} from '../../../hooks/artgram/useUpdatecomments'
// import 컴포넌트 -----------------------------------------------------------------------------------------/
import ArtgramDetailReply from './ArtgramDetailReply';

function ArtgramDeteilCommentsEdit({artgramId, comment}) {
  const commentRef = useRef(null)
  const [timehandle] = usePostingtime();
  const email = useRecoilValue(decodeEmail)
  const {deleteHandle } = useDeletecomments();
  const [showReply, setShowReply] = useState(false)
  const {replyState, setReplyState, reply, setReply,replyHandle} = usePostReply(); 
  const { edit, setEdit, updatecomment, setUpdateComment, resetReply,onSubmitupdateComments } = 
    useUpdatecomments(artgramId, comment.commentId);
  
  useEffect(() => {
    if (replyState && commentRef.current) {
      commentRef.current.focus();
    }
  }, [replyState, commentRef]);
  
  return (
    <>
    <Comment.ProfileNickNameComments>
      <span className='profileNickname'>{comment.profileNickname}</span>
      {!edit ?
      <span className='comments'>{comment.comment}</span>
    : (<form className='commentsUpdateForm' onSubmit={(e) => onSubmitupdateComments(e)}>
      <input value={updatecomment} onChange={(e)=>setUpdateComment(e.target.value)} placeholder={comment.comment}/>
    </form>)}
    </Comment.ProfileNickNameComments>
    <div style={{display:"flex", gap:"10px", marginTop:"4px", marginBottom:"16px"}}>
      <div>{timehandle(comment.createdAt)}</div>
      {email === comment.userEmail && (<>
          {!edit
            ? (<div 
                className='curserPoint'
                onClick={()=>{
                setReplyState(false)
                setEdit(pre=>!pre)
            }}>수정</div>)
            : (<div className='curserPoint' onClick={(e) => onSubmitupdateComments(e)}>수정완료</div>)}
          <div className='curserPoint' onClick={() => deleteHandle(artgramId, comment.commentId)}>삭제</div>
      </>)}
        {!email
        ? null
        : email && !replyState 
        ? <div 
            className='curserPoint' 
            onClick={()=>{
              setEdit(false)
              setReplyState(pre=>!pre)}}
            children="답글달기"/>
        : <form style={{position:"relative"}} onSubmit={(e)=>replyHandle(e, artgramId, comment.commentId,reply)}>
          <Comment.CommentsInput ref={commentRef} value={reply} onChange={(e)=>setReply(e.target.value)} placeholder='답글을 입력해주세요.'/>
          <Comment.CommentsInputBtn as="button" type="submit" className='curserPoint' top19="0" top14="-4px" right19="-50px" right14="-45px">입력</Comment.CommentsInputBtn>
          <Comment.CommentsInputBtn as="button" type="button" onClick={()=>{resetReply(setReply); setReplyState(pre=>!pre)}} className='curserPoint' top19="0" top14="-4px" right19="-100px" right14="-80px">취소</Comment.CommentsInputBtn>
        </form>}
    </div>
    
    {comment.replyCount > 0 && (
      <div>
        {!showReply
          ? <div className='curserPoint' style={{display:"grid", gridTemplateColumns:"50px 1fr"}}>
            <div style={{borderTop: "1px solid black", margin: "6px 0", marginRight:"10px"}}></div>
            <div onClick={()=>setShowReply(pre=>!pre)}> 답글보기 ({comment.replyCount})</div>
          </div>
          : <ArtgramDetailReply artgramId={artgramId} commentId={comment.commentId} showReply={showReply} setShowReply={setShowReply}/>
        }
      </div>
    )}
    </>
  )
}

export default ArtgramDeteilCommentsEdit;