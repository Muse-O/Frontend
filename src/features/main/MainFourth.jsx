import React, { useState } from "react";
import * as Main from "./css/mainparts";
import { fourthDataList } from "./mainpageexample/fourthDataList";
import { useGetDate } from "../../hooks/main/useGetDate";

function MainFourth() {
  const [imgState, setImgState] = useState(fourthDataList[0].img);
  const {getday, getMonth} = useGetDate()

  return (
    <Main.CommenLayout height="624">
      <Main.ArticleTitle>
        <Main.MainH1 children="예정 전시" />
      </Main.ArticleTitle>
      <Main.FourthWrap>
        <img
          className="exhibitionimg"
          src={imgState}
          alt="예정전시 이미지"/>
        <div className="exhibitioninfo">
          {fourthDataList.map((exhibition, index) => (
            <Main.FourthExhibitioninfo key={index} onMouseOver={()=>setImgState(exhibition.img)}>
              <div className="date">
                <p>{getday(exhibition.date)}</p>
                <p>{getMonth(exhibition.date)}</p>
              </div>
              <div className="exhibitininfo">
                <p>{exhibition.titleKo}</p>
                <p>{exhibition.titleEn}</p>
              </div>
              <div className="exhibitionlocation">
                <p>{exhibition.location}</p>
              </div>
            </Main.FourthExhibitioninfo>
          ))}
        </div>
      </Main.FourthWrap>
    </Main.CommenLayout>
  );
}

export default MainFourth;
