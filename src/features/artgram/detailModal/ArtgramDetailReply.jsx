import React from 'react'
// import CSS & icons & png ------------------------------------------------------------------------------/
import * as Comment from '../css/ArtgramDetailCss'
// import Library-----------------------------------------------------------------------------------------/
import { useRecoilValue } from 'recoil';
import { decodeEmail } from '../../login/loginTokenStore';
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { useGetReply } from '../../../hooks/artgram/useGetReply'
import { useDeleteReply } from '../../../hooks/artgram/useDeleteReply';
import { usePostingtime } from '../../../hooks/artgram/usePostingtime';

function ArtgramDetailReply({artgramId, commentId, showReply, setShowReply}) {
  const [timehandle] = usePostingtime(); 
  const {deleteHandle} = useDeleteReply()
  const email = useRecoilValue(decodeEmail)
  const { isLoading, isError, data: reply } = useGetReply(
    artgramId,
    commentId
  );
  
  return (
    <>
      {showReply && 
      <div className='curserPoint' style={{display:"grid", gridTemplateColumns:"50px 1fr", marginBottom:"8px"}}>
      <div style={{borderTop: "1px solid black", margin: "6px 0", marginRight:"10px"}}></div>
      <div onClick={()=>setShowReply(pre=>!pre)} children="답글닫기"/>
    </div>
      }
      {isLoading || isError 
        ? (<div>로딩 중 ...</div>) 
        : reply && reply.map(reply=> (<Comment.CommentBox key={reply.commentId}>
          <Comment.CommentBoxProfileImg img={reply.profileImg} />
          <Comment.CommentBoxInnerText>
            <div><span className='profileNickname' children={reply.profileNickname}/>{reply.comment}</div>
            <div style={{display:"flex",gap:"8px"}}>
            <div>{timehandle(reply.createdAt)}</div>
              {email === reply.userEmail 
                && <div 
                      className='curserPoint' 
                      children="삭제"
                      onClick={()=>deleteHandle(artgramId, reply.commentParent, reply.commentId)}/>}
          </div>
          </Comment.CommentBoxInnerText>
        </Comment.CommentBox>))}
    </>
  );
}

export default ArtgramDetailReply
