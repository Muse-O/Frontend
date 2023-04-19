import React from "react";
import { useScrapExhibition } from "../../hooks/exhibition/useScrapExhibition";
import styled from "styled-components";

//!좋아요랑 버튼 로직이 비슷한데 리팩토링때 합치기.
function ExhibitionScrap({ exhibitionId, children }) {
  const [scrapExhibition] = useScrapExhibition();
  const scrapHandler = (exhibitionId) => {
    scrapExhibition(exhibitionId);
  };
  return (
    <ScrapBtn onClick={() => scrapHandler(exhibitionId)}>{children}</ScrapBtn>
  );
}

export default ExhibitionScrap;

const ScrapBtn = styled.button`
  background-color: white;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
`;
