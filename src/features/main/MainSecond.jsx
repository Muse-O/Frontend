import React from "react";
import * as Main from "./css/mainparts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCurrentExhibitonSlider } from "../../hooks/main/useCurrentExhibitonSlider";
import { useOpenExhibitionByDate } from "../../hooks/main/useOpenExhibitionByDate";
import { useNavigator } from "../../hooks/main/useNavigator";
import { useEditTime } from "../../hooks/main/useEditTime";

function MainSecond() {
  const { slidersettings } = useCurrentExhibitonSlider();
  const { isLoading, isError, data } = useOpenExhibitionByDate();
  const { editTimehandle } = useEditTime();
  const { navigatehandle } = useNavigator();

  return (
    <Main.CommenLayout height="459">
      <Main.ArticleTitle>
        <Main.MainH1 children="최신 전시" />
      </Main.ArticleTitle>
      <Main.SecondSliderWrap>
        <Slider {...slidersettings}>
          {isLoading || isError || !data ? (
            <div>로딩 중...</div>
          ) : (
            data.map((exhibition) => (
              <Main.SecondSlider
                key={exhibition.exhibitionId}
                onClick={() => navigatehandle(exhibition.detailRouter)}
              >
                <img
                  className="sliderImg"
                  src={exhibition.postImage}
                  alt="최신전시"
                />
                <p className="sliderTitle">{exhibition.exhibitionTitle}</p>
                <p className="sliderdate">
                  {editTimehandle(exhibition.startDate)}
                  {" - "}
                  {editTimehandle(exhibition.endDate)}
                </p>
                <p className="sliderLocation">{exhibition.sido}</p>
              </Main.SecondSlider>
            ))
          )}
        </Slider>
      </Main.SecondSliderWrap>
    </Main.CommenLayout>
  );
}

export default MainSecond;
