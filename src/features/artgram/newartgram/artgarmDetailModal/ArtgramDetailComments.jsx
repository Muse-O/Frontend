import React from "react";
// import CSS & icons & png ------------------------------------------------------------------------------/
import { CommentsLayout } from "../ArtgramDetailModalCss";
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { useGetartgramComments } from "../../../../hooks/artgram/useGetartgramComments";
// import 컴포넌트 -----------------------------------------------------------------------------------------/
import ArtgramDeteilCommentEdit from "../ArtgramDeteilCommentEdit";
// ArtgramDetailComments 컴포넌트 --------------------------------------------------------------------------/
function ArtgramDetailComments({ artgramId }) {
  const [commentsIsLoading, commentsIsError, commentsData] = useGetartgramComments(artgramId); // 아트그램상세, 댓글조회 비동기통신 GET
  return (
    <CommentsLayout>
      {commentsIsLoading || commentsIsError
      ? (<div>로딩 중 ...</div>) 
      : commentsData.map((comment) => (
          <div key={comment.commentId} className="artgarmcomments">
            <div className="profileimg" />
            <div>
              <div className="commentWrap">
                <ArtgramDeteilCommentEdit
                  artgramId={artgramId}
                  comment={comment}
                />
              </div>
            </div>
          </div>
        ))
      }
    </CommentsLayout>
  );
}

export default ArtgramDetailComments;
