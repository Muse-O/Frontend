import React from "react";
import { useLikeExhibition } from "../../hooks/exhibition/useLikeExhibition";
import styled, { isStyledComponent } from "styled-components";
import { cookies } from "../../shared/cookies";

function ExhibitionLiked({ exhibitionId, children }) {
  const access_token = cookies.get("access_token");
  const [likeExhibition] = useLikeExhibition();
  const likeHandler = (exhibitionId) => {
    if (!access_token) {
      alert("로그인이 필요한 서비스 입니다.");
      return;
    }
    likeExhibition(exhibitionId);
  };
  return (
    <>
      <LikeBtn onClick={() => likeHandler(exhibitionId)}>{children}</LikeBtn>
    </>
  );
}

export default ExhibitionLiked;

const LikeBtn = styled.button`
  background-color: white;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
`;
