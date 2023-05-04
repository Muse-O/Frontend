import React from "react";
// import CSS & icons & png ------------------------------------------------------------------------------/
import * as Comment from '../css/ArtgramDetailCss'
import { CommentsLayout } from "../css/ArtgramDetailModalCss";
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { useGetartgramComments } from "../../../hooks/artgram/useGetartgramComments";
// import 컴포넌트 -----------------------------------------------------------------------------------------/
import ArtgramDeteilCommentsEdit from "./ArtgramDeteilCommentsEdit";

function ArtgramDetailComments({ artgramId }) {
  const [isLoading, isError, commentsData] = useGetartgramComments(artgramId); 
  return (
    <CommentsLayout>
      {isLoading || isError
      ? (<div>로딩 중 ...</div>) 
      : commentsData.map((comment) => (
        <Comment.CommentBox key={comment.commentId}>
          <Comment.CommentBoxProfileImg img={comment.profileImg} />
          <Comment.CommentBoxInnerText children={<ArtgramDeteilCommentsEdit artgramId={artgramId}comment={comment}/>}/>

        </Comment.CommentBox>
        ))
      }
    </CommentsLayout>
  );
}

export default ArtgramDetailComments;