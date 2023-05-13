import React from "react";
// import CSS --------------------------------------------------------------------------------------------/
import {AiFillHeart} from "react-icons/ai"
import {RiBookmarkFill} from "react-icons/ri"
import { Flex } from "../../../components/Flex";
import * as Artgramparts from "../css/ArtgramCss";
import { CommentsInputBtn } from "../css/ArtgramDetailCss";
import { CommentWriteLayout } from "../css/ArtgramDetailModalCss";
// import Library-----------------------------------------------------------------------------------------/
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { decodeUserRole } from "../../login/loginTokenStore";
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { useScrap } from "../../../hooks/artgram/useScrap";
import { useLikes } from "../../../hooks/artgram/useLikes";
import { useFormInput } from "../../../hooks/useFormInput";
import { usePostcomments } from "../../../hooks/artgram/usePostcomments";
// import 컴포넌트 -----------------------------------------------------------------------------------------/
import { Input } from "../../../components/Input";

function ArtgramDetailCommentWrite({artgramId, detailData,searchWord}) {
  const navigate = useNavigate()
  const { patchScrap } = useScrap(searchWord);
  const { patchLikes } = useLikes(searchWord);
  const userRole = useRecoilValue(decodeUserRole)
  const [formState, setFormState, handleInputChange] = useFormInput(); 
  const [commentHandle] = usePostcomments(setFormState);
  const onSubmitcomment = (e) => {
    e.preventDefault();
    !userRole && window.confirm("회원만 가능합니다. 로그인 하시겠습니까?") && navigate('/login')
    userRole && commentHandle(e, artgramId, formState.comment);};
  return (
    <CommentWriteLayout>
      <div className="scrapLiked">
        <Flex gap="8" style={{ padding: "24px" }}>
          <Artgramparts.DetailScrap
            state={detailData.scrap}
            onClick={(event) => {
              event.stopPropagation();
              !userRole && window.confirm("회원만 가능합니다. 로그인 하시겠습니까?") && navigate('/login')
              userRole && patchScrap(artgramId);
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
              !userRole && window.confirm("회원만 가능합니다. 로그인 하시겠습니까?") && navigate('/login')
              userRole && patchLikes(artgramId);
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
          <CommentsInputBtn 
            as="button" 
            className="curserPoint" 
            style={{border:"1px solid #242424"}} 
            height19="40px" height14="30px" 
            bottom19="8px" bottom14="6px" 
            right19="20px" right14="8px">입력</CommentsInputBtn>
        </form>
      </div>
    </CommentWriteLayout>
  );
}

export default ArtgramDetailCommentWrite;
