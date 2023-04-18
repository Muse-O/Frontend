import React from "react";
import * as Artgramparts from "./ArtgramCss";
import * as DetailModal from './ArtgramDetailModalCss'
import ArtgramSlider from "../ArtgramSlider";
import { useGetartgramDetail } from "../../../hooks/artgram/useGetartgramDetail";
import { useGetartgramComments } from "../../../hooks/artgram/useGetartgramComments";
import { useFormInput } from "../../../hooks/useFormInput";
import { usePostcomments } from "../../../hooks/artgram/usePostcomments";
import { Input } from "../../../components/Input";
import ArtgramDeteilCommentEdit from "./ArtgramDeteilCommentEdit";
import { useLikes } from "../../../hooks/artgram/useLikes";
import { useScrap } from "../../../hooks/artgram/useScrap";
import { BsBookmarkFill, BsFillHeartFill } from "react-icons/bs";
import dayjs from "dayjs";
import { Flex } from "../../../components/Flex";

function ArtgarmDetailModal({ artgramId, modalState, openModalhandle }) {
  const [detailIsLoading, detailIsError, detailData] =
    useGetartgramDetail(artgramId);
  const [commentsIsLoading, commentsIsError, commentsData] =
    useGetartgramComments(artgramId);

  // 댓글입력받는 폼
  const [formState, setFormState, handleInputChange] = useFormInput();
  const [commentHandle] = usePostcomments(setFormState);
  const onSubmitcomment = (e) => {
    e.preventDefault();
    commentHandle(e, artgramId, formState.comment);
  };

  const { patchLikes } = useLikes();
  const { patchScrap } = useScrap();
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
            <DetailModal.SliderOutline>
              {detailData.ArtgramImgs.length > 1 ? (
                <div className="sliderLayout">
                  <ArtgramSlider map={detailData.ArtgramImgs} />
                </div>
              ) : (
                <img src={detailData.ArtgramImgs[0].imgUrl} width="100%" />
              )}
            </DetailModal.SliderOutline>
            <DetailModal.ModalContent>
              <DetailModal.ContentInnerText>
                <div className="profileimg" />
                <div>
                  <div>
                    <p className="profileNickname">{detailData.nickname}</p>
                    <p className="artgarmDetailTitle">
                      {detailData.artgramTitle}
                    </p>
                    <p className="artgarmDetailDesc">
                      {detailData.artgramDesc}
                    </p>
                    <p className="artgarmDetailHashTag">
                      {detailData.hashtag.map((tag) => `#${tag}` + " ")}
                    </p>
                  </div>
                </div>
              </DetailModal.ContentInnerText>
              <DetailModal.CommentsLayout>
                {commentsData.map((comment) => (
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
                ))}
              </DetailModal.CommentsLayout>
              <DetailModal.CommentWriteLayout>
                <div className="scrapLiked">
                  <Flex gap="8" style={{ padding: "24px" }}>
                    <Artgramparts.DetailScrap
                      state={detailData.scrap}
                      onClick={(event) => {
                        event.stopPropagation();
                        patchScrap(artgramId);
                      }}
                    >
                      <p>
                        <BsBookmarkFill />
                      </p>
                      <p>{detailData.artgramScrapCount}</p>
                    </Artgramparts.DetailScrap>
                    <Artgramparts.DetailHeart
                      state={detailData.liked}
                      onClick={(event) => {
                        event.stopPropagation();
                        patchLikes(artgramId);
                      }}
                    >
                      <p>
                        <BsFillHeartFill />
                      </p>
                      <p>{detailData.artgramLikeCount}</p>
                    </Artgramparts.DetailHeart>
                    <div
                      style={{
                        color: "#7E7E7E",
                        textAlign: "end",
                        width: "100%",
                      }}
                    >
                      {dayjs(detailData.createdAt).format("YYYY년 MM월 DD일")}
                    </div>
                  </Flex>
                </div>
                <div className="commentInput">
                  <form onSubmit={onSubmitcomment}>
                    <Input
                      inputProps={{
                        type: "text",
                        name: "comment",
                        value: formState["comment"] || "",
                        placeholder: "댓글 달기...",
                        onChange: handleInputChange,
                      }}
                    />
                  </form>
                </div>
              </DetailModal.CommentWriteLayout>
            </DetailModal.ModalContent>
          </>
        )}
      </Artgramparts.ModalWindow>
    </>
  );
}

export default ArtgarmDetailModal;
