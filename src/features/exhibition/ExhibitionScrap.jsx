import React from "react";
import { useScrapExhibition } from "../../hooks/exhibition/useScrapExhibition";

//!좋아요랑 버튼 로직이 비슷한데 리팩토링때 합치기.
function ExhibitionScrap({ exhibitionId, children }) {
  const [scrapExhibition] = useScrapExhibition();
  const scrapHandler = (exhibitionId) => {
    scrapExhibition(exhibitionId);
  };
  return <button onClick={() => scrapHandler(exhibitionId)}>{children}</button>;
}

export default ExhibitionScrap;
