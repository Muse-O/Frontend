import React from "react";
import * as Main from "./css/mainparts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SecondSliderList } from "./mainpageexample/SecondSliderList";
import { useCurrentExhibitonSlider } from "../../hooks/main/useCurrentExhibitonSlider";
import { useOpenExhibitionByDate } from "../../hooks/main/useOpenExhibitionByDate";
import { useNavigator } from "../../hooks/main/useNavigator";
import { useEditTime } from "../../hooks/main/useEditTime";

function MainSecond() {
  const { slidersettings } = useCurrentExhibitonSlider();
  const { isLoading, isError, data } = useOpenExhibitionByDate();
  const { editTimehandle } = useEditTime();
  const { navigatehandle } = useNavigator();
  console.log(data);

  // detailRouter: "/exhibition/detail/b5492532-998c-4248-ad42-e347d12888e5";
  // endDate: "2023-04-20T00:00:00.000Z";
  // exhibitionId: "b5492532-998c-4248-ad42-e347d12888e5";
  // exhibitionKind: "오프라인";
  // exhibitionTitle: "제목";
  // index: 1;
  // location: "임건님";
  // postImage: "https://woog-s3-bucket.s3.amazonaws.com/exhibition/e62832d3-4f71-4659-8753-ee143a3f41f5.jpeg";
  // sido: "경북";
  // startDate: "2023-04-14T00:00:00.000Z";

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
