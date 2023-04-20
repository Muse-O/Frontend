import React from "react";
import * as Main from "./css/mainparts";
import { useMostLike } from "../../hooks/main/useMostLike";
import { useEditTime } from "../../hooks/main/useEditTime";
import { useNavigator } from "../../hooks/main/useNavigator";

function MainThird() {
  const { isLoading, isError, data } = useMostLike();
  const { editTimehandle } = useEditTime();
  const {navigatehandle} = useNavigator()

  return (
    <Main.ThirdLayout height="782">
      <Main.ArticleTitle>
        <Main.MainH1 children="TOP 10" />
      </Main.ArticleTitle>
      <Main.ThirdWrap gap="23" fw="wrap">
        {isLoading || isError ? (
          <div> 로딩 중 ...</div>
        ) : !data ? (
          <div>로딩 중 ...</div>
        ) : (
          data.map((mostlikeExhibition) => (
            <Main.ThirdInner key={mostlikeExhibition.exhibitionId} onClick={()=>navigatehandle(mostlikeExhibition.detailRouter)}>
              <div className="number">
                <p>{mostlikeExhibition.index}</p>
              </div>
              <div className="exhibitionimg">
                <img
                  className="exhibitionimg"
                  src={mostlikeExhibition.postImage}
                  alt="인기순 전시"
                />
              </div>
              <div className="innerText">
                <p className="titleKo">{mostlikeExhibition.exhibitionTitle}</p>
                <p className="titleEn">
                  {mostlikeExhibition.exhibitionEngTitle}
                </p>
                <p className="location">
                  {editTimehandle(mostlikeExhibition.startDate)}{" - "}
                  {editTimehandle(mostlikeExhibition.endDate)}
                </p>
              </div>
            </Main.ThirdInner>
          ))
        )}
      </Main.ThirdWrap>
    </Main.ThirdLayout>
  );
}

export default MainThird;
