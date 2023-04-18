import React from "react";
import * as Artgramparts from "./ArtgramCss";
import ArtgramSlider from "../ArtgramSlider";
import { useGetartgramDetail } from "../../../hooks/artgram/useGetartgramDetail";
import { useGetartgramComments } from "../../../hooks/artgram/useGetartgramComments";
import { useFormInput } from "../../../hooks/useFormInput";
import { usePostcomments } from "../../../hooks/artgram/usePostcomments";
import { Input } from "../../../components/Input";
import ArtgramDeteilCommentEdit from "./ArtgramDeteilCommentEdit";

function ArtgarmDetailModal({ artgramId, modalState, openModalhandle }) {
  const [detailIsLoading, detailIsError, detailData] = useGetartgramDetail(artgramId);
  const [commentsIsLoading, commentsIsError, commentsData] = useGetartgramComments(artgramId);
  // console.log(detailData);
  // console.log(commentsData);


  // 댓글입력받는 폼
  const [formState, setFormState, handleInputChange] = useFormInput();
  const [commentHandle] = usePostcomments(setFormState);
  const onSubmitcomment = (e) => {
    e.preventDefault()
    commentHandle(e, artgramId, formState.comment)
}


  return (
    <>
      <Artgramparts.ModalBackground
        state={modalState}
        onClick={(e) => {
          e.stopPropagation();
          openModalhandle();
        }}
      />
      <Artgramparts.ModalWindow
        state={modalState}
        onClick={(e) => e.stopPropagation()}
      >
        {detailIsLoading ||
        detailIsError ||
        commentsIsLoading ||
        commentsIsError ? (
          <div>로딩 중...</div>
        ) : (
          <>
            <div className="artgarmDetailModalSlider">
              {detailData.ArtgramImgs.length > 1 ? (
                <div className="sliderLayout">
                  <ArtgramSlider map={detailData.ArtgramImgs} />
                </div>
              ) : (
                <img src={detailData.ArtgramImgs[0].imgUrl} width="100%" />
              )}
            </div>
            <div className="artgarmDetailModalContent">
              <div className="artgarmDetailinfo">
                <div className="profileimg" />
                <div>
                  <div>
                    <p className="profileNickname">{detailData.nickname}</p>
                    <p className="artgarmDetailTitle">{detailData.artgramTitle}</p>
                    <p className="artgarmDetailDesc">{detailData.artgramDesc}</p>
                    <p className="artgarmDetailHashTag">{detailData.hashtag.map(tag => `#${tag}`+" ")}</p> 
                  </div>
                </div>
              </div>
              <div className="artgarmcommentBox">
                {commentsData.map(comment => (
                    <div key={comment.commentId} className="artgarmcomments">
                      <div className="profileimg" />
                      <div>
                        <div className="commentWrap">
                          <ArtgramDeteilCommentEdit artgramId={artgramId} comment={comment}/>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="commentWrite">
                <div className="scrapLiked">좋아요/스크랩</div>
                <div className="commentInput"><form onSubmit={onSubmitcomment}>
                <Input
                  inputProps={{
                    type: "text",
                    name: "comment",
                    value: formState["comment"] || "",
                    placeholder: "댓글 달기...",
                    onChange: handleInputChange,
                  }}
                />
              </form></div>
              </div>
            </div>
          </>
        )}
      </Artgramparts.ModalWindow>
    </>
  );
}

export default ArtgarmDetailModal;
