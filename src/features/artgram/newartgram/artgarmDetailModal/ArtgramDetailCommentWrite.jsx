import React from "react";
import { CommentWriteLayout } from "../ArtgramDetailModalCss";
import { useScrap } from "../../../../hooks/artgram/useScrap";
import { useLikes } from "../../../../hooks/artgram/useLikes";
import dayjs from "dayjs";
import { usePostcomments } from "../../../../hooks/artgram/usePostcomments";
import { useFormInput } from "../../../../hooks/useFormInput";
import {RiBookmarkFill} from "react-icons/ri"
import {AiFillHeart} from "react-icons/ai"
import { Flex } from "../../../../components/Flex";
import * as Artgramparts from "../ArtgramCss";
import { Input } from "../../../../components/Input";
// import { BsBookmarkFill, BsFillHeartFill } from "react-icons/bs";

function ArtgramDetailCommentWrite({artgramId, detailData}) {
  const { patchScrap } = useScrap(); // 스크랩관련 비동기통신 PATCH
  const { patchLikes } = useLikes(); // 좋아요관련 비동기통신 PATCH
  const [formState, setFormState, handleInputChange] = useFormInput(); // 커스컴훅-Form태그 관련 
  const [commentHandle] = usePostcomments(setFormState); // 아트그램상세, 댓글입력 비동기통신 POST
  const onSubmitcomment = (e) => {
    e.preventDefault();
    commentHandle(e, artgramId, formState.comment);}; // 아트그램상세, 댓글입력 Form태그의 onSubmit
  return (
    <CommentWriteLayout>
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
              <RiBookmarkFill />
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
              <AiFillHeart />
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
    </CommentWriteLayout>
  );
}

export default ArtgramDetailCommentWrite;
