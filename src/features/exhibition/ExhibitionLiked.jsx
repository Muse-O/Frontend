import React from "react";
import { useLikeExhibition } from "../../hooks/exhibition/useLikeExhibition";
import styled, { isStyledComponent } from "styled-components";

function ExhibitionLiked({ exhibitionId, children }) {
  const [likeExhibition] = useLikeExhibition();
  const likeHandler = (exhibitionId) => {
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
