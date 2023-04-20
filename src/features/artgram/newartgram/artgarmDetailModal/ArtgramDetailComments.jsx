import React from "react";
// import CSS & icons & png ------------------------------------------------------------------------------/
import { CommentsLayout } from "../ArtgramDetailModalCss";
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { useGetartgramComments } from "../../../../hooks/artgram/useGetartgramComments";
import styled from "styled-components";
import ArtgramDeteilCommentsEdit from "./ArtgramDeteilCommentsEdit";
// ArtgramDetailComments 컴포넌트 --------------------------------------------------------------------------/
function ArtgramDetailComments({ artgramId }) {
  const [commentsIsLoading, commentsIsError, commentsData] = useGetartgramComments(artgramId); // 아트그램상세, 댓글조회 비동기통신 GET
  console.log(commentsData);
  return (
    <CommentsLayout>
      {commentsIsLoading || commentsIsError
      ? (<div>로딩 중 ...</div>) 
      : commentsData.map((comment) => (
        <CommentBox key={comment.commentId}>
          <CommentBoxProfileImg img={comment.profileImg} />
          <CommentBoxInnerText children={<ArtgramDeteilCommentsEdit artgramId={artgramId}comment={comment}/>}/>
        </CommentBox>
        ))
      }
    </CommentsLayout>
  );
}

export default ArtgramDetailComments;

const CommentBox = styled.div`
  display:grid;
  grid-template-columns:33px 1fr;
  margin-bottom:10px;
  gap:5px;
`

const CommentBoxProfileImg = styled.div`
  background-color:lightgray;
  background-image: url(${pos => pos.img});
  background-position: center;
  background-size: cover;
  width:33px;
  height:33px;
  border-radius:50px;
`

const CommentBoxInnerText = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  background-color:yellow;
`