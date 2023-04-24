import React, { useEffect, useState } from "react";
import * as Main from "./css/mainparts";
import { useGetDate } from "../../hooks/main/useGetDate";
import { useNearestExhibition } from "../../hooks/main/useNearestExhibition";
import { useNavigator } from "../../hooks/main/useNavigator";

function MainFourth() {
  const { getday, getMonth } = useGetDate();

  const { isLoading, isError, data } = useNearestExhibition();
  const [imgState, setImgState] = useState(null);
  const {navigatehandle} = useNavigator()

  useEffect(() => {
    if (data && data.length > 0) {
      setImgState(data[0].postImage);
    }
  }, [data]);

  if (isLoading || isError) {
    return <div>로딩 중... </div>;
  }

  return (
    <Main.CommenLayout height="624">
      <Main.ArticleTitle>
        <Main.MainH1 children="예정 전시" />
      </Main.ArticleTitle>
      <Main.FourthWrap>
        <img className="exhibitionimg" src={imgState} alt="예정전시 이미지" />
        <div className="exhibitioninfo">
          {data.map(exhibition => {
            return (
              <Main.FourthExhibitioninfo
                key={exhibition.exhibitionId}
                onMouseOver={() => setImgState(exhibition.postImage)}
                onClick={()=> navigatehandle(exhibition.detailRouter)}
              >
                <div className="date">
                  <p>{getday(exhibition.startDate)}</p>
                  <p>{getMonth(exhibition.startDate)}</p>
                </div>
                <div className="exhibitininfo">
                  <p>{exhibition.exhibitionTitle}</p>
                  <p>{exhibition.exhibitionEngTitle}</p>
                </div>
                <div className="exhibitionlocation">
                  <p>{exhibition.location}</p>
                </div>
              </Main.FourthExhibitioninfo>
            )
          })}
        </div>
      </Main.FourthWrap>
    </Main.CommenLayout>
  );
}

export default MainFourth;
