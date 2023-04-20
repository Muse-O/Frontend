import React from 'react'
// import CSS & icons & png ------------------------------------------------------------------------------/
import styled from 'styled-components';
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { usetoken } from '../../../../shared/cookies';
import {usePostingtime} from '../../../../hooks/artgram/usePostingtime'
import {useDeletecomments} from '../../../../hooks/artgram/newArtgram/useDeletecomments'
import {useUpdatecomments} from '../../../../hooks/artgram/newArtgram/useUpdatecomments'
import {usePostReply} from '../../../../hooks/artgram/newArtgram/usePostReply'

// // ArtgramDeteilCommentsEdit 컴포넌트 -------------------------------------------------------------------/
function ArtgramDeteilCommentsEdit({artgramId, comment}) {
  const {decodetoken} = usetoken() // ToKen에서 사용자 Email 정보 가져오기 
  const [timehandle] = usePostingtime(); // 서버로부터 받아온 날짜을 가공하는 커스텀 훅
  const {deleteHandle } = useDeletecomments(); // 댓글삭제 비동기통신 DELETE 
  const { edit, setEdit, updatecomment, setUpdateComment, onSubmitupdateComments } = 
    useUpdatecomments(artgramId, comment.commentId); // 댓글수정 비동기통신 UPDATE
  const {replyState, setReplyState, reply, setReply,replyHandle} = usePostReply(); // 대댓글입력 비동기통신 POST

  return (
    <>
    <ProfileNickNameComments>
      <span className='profileNickname'>{comment.profileNickname}</span>
      {!edit ?
      <span className='comments'>{comment.comment}</span>
    : (<form className='commentsUpdateForm' onSubmit={(e) => onSubmitupdateComments(e)}>
      <input value={updatecomment} onChange={(e)=>setUpdateComment(e.target.value)} placeholder={comment.comment}/>
    </form>)}
    </ProfileNickNameComments>
    <div style={{backgroundColor:"skyblue", display:"flex", gap:"10px", marginTop:"4px"}}>
      <div>{timehandle(comment.createdAt)}</div>
      {!replyState 
        ? <div onClick={()=>setReplyState(pre=>!pre)}>답글달기</div>
        : <form onSubmit={(e)=>replyHandle(e, artgramId, comment.commentId,reply)}>
          <input value={reply} onChange={(e)=>setReply(e.target.value)} placeholder='답글을 입력해주세요.'/>
          <input type='submit' value="답글달기"/>
        </form>}
      {decodetoken.email === comment.userEmail && (<>
          {!edit
            ? (<div onClick={()=>setEdit(pre=>!pre)}>수정</div>)
            : (<div onClick={(e) => onSubmitupdateComments(e)}>수정완료</div>)}
          <div onClick={() => deleteHandle(artgramId, comment.commentId)}>삭제</div>
      </>)}
    </div>
    
    {comment.replyCount > 0 && (
      <div style={{backgroundColor:"skyblue", display:"flex", gap:"10px", marginTop:"16px"}}>
        <div> 답글보기 ({comment.replyCount})</div>
      </div>
    )}
    </>
  )
}

export default ArtgramDeteilCommentsEdit

const ProfileNickNameComments = styled.div`
  .profileNickname{
    font-family: "Montserrat";
    font-weight:550;
    font-size: 12px;
  }
  .comments {
    margin-left:8px;
    font-size:12px;
    line-height:20px;
  }
  .commentsUpdateForm {
    display: inline-block;
    margin-left:8px;
    font-size:12px;
    height:20px;
    input {
    width: 430px;
    border: 2px solid orange;
    border-radius: 15px;
    font-size: 13px;
    padding-left: 4px;
      :focus {
        outline: none;
      }
      ::placeholder {
        font-size: 10px; /* 원하는 글자 크기 설정 */
      }
    }
  }
`
