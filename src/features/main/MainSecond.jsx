import React from "react";
// import CSS --------------------------------------------------------------------------------------------/
import * as Main from "./css/mainparts";
// import Library-----------------------------------------------------------------------------------------/
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { useEditTime } from "../../hooks/main/useEditTime";
import { useOpenExhibitionByDate } from "../../hooks/main/useOpenExhibitionByDate";
import { useCurrentExhibitonSlider } from "../../hooks/main/useCurrentExhibitonSlider";
import { useNavigate } from "react-router-dom";

function MainSecond() {
  const navigate = useNavigate();
  const { editTimehandle } = useEditTime();
  const { slidersettings } = useCurrentExhibitonSlider();
  const { isLoading, isError, data } = useOpenExhibitionByDate();
  return (
    <Main.CommenLayout height="497" media1440="372.75">
      <Main.ArticleTitle>
        <Main.MainH1 children="최신 전시" />
        <Main.MainH5 children="더보기 >" onClick={()=>navigate('/exhibition')}/>
      </Main.ArticleTitle>
      { isLoading || isError
        ? <div style={{marginTop:"66px"}}>로딩 중...</div>
        : data && data.length === 0 
        ? <div style={{marginTop:"66px"}}>데이터가 없습니다...</div>
        : 
        <Main.SecondSliderWrap>
            <Slider {...slidersettings}>
              {data.map(exhibition => (
                <Main.SecondSlider key={exhibition.exhibitionId} onClick={() => navigate(exhibition.detailRouter)}>
                  <Main.SecondSliderImg src={exhibition.postImage} alt='최신전시 이미지'/>
                  <Main.SecondSliderTitle children={exhibition.exhibitionTitle}/>
                  <Main.SecondSliderDate children={`${editTimehandle(exhibition.startDate)} - ${editTimehandle(exhibition.endDate)}`}/>
                  <Main.SecondSliderlocation children={exhibition.address}/>
                </Main.SecondSlider>
              ))}
            
            </Slider>
        </Main.SecondSliderWrap>
      }
    </Main.CommenLayout>
  );
}

export default MainSecond;