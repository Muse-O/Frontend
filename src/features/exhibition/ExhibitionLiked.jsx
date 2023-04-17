import React from "react";
import { useLikeExhibition } from "../../hooks/exhibition/useLikeExhibition";

function ExhibitionLiked({ exhibitionId, children }) {
  const [likeExhibition] = useLikeExhibition();
  const likeHandler = (exhibitionId) => {
    likeExhibition(exhibitionId);
  };
  return <button onClick={() => likeHandler(exhibitionId)}>{children}</button>;
}

export default ExhibitionLiked;
