import React from "react";
// import CSS --------------------------------------------------------------------------------------------/
import * as Main from "./css/mainparts";
// import Library-----------------------------------------------------------------------------------------/
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { usePersonalExhibition } from "../../hooks/main/usePersonalExhibition";
import { useAsNavForSliderMainFirst } from "../../hooks/main/useAsNavForSliderMainFirst";
// import 컴포넌트 -----------------------------------------------------------------------------------------/
import FirstMainSlider from "./innerDiv/FirstMainSlider";

function MainFirst() {
  const { isLoading, isError, data, editLists } = usePersonalExhibition();
  const { firstSliderSettings, secondSliderSettings, currentSlideIndex } = useAsNavForSliderMainFirst();
  return (
    <Main.CommenLayout height="709" media1440="528">
      <Main.ArticleTitle>
        <Main.MainH4 children="개인전" />
      </Main.ArticleTitle>
      { isLoading || isError
        ? <div style={{marginTop:"66px"}}>로딩 중...</div>
        : data && data.length === 0 
        ? <div style={{marginTop:"66px"}}>데이터가 없습니다...</div>
        : (<Main.FirstWrapGrid>
            <Main.FirstMainSlider>
            <Slider {...firstSliderSettings}>
              {data && data.map(personalEx => (
                <Main.FirstMainSliderWrap key={personalEx.exhibitionId}>
                  <FirstMainSlider personalEx={personalEx}/>
                </Main.FirstMainSliderWrap>
              ))}
            </Slider>
          </Main.FirstMainSlider>
          <Main.FirstSubSlider
            children={
              <Slider {...secondSliderSettings}>
              {editLists && editLists.length !== 0 && editLists.map(personalEx => (
                <Main.FirstSubSliderWrap 
                  key={personalEx?.exhibitionId} 
                  children={<Main.FirstSubSliderImg src={personalEx.postImage} alt="개인전 이미지"/>}/>))}
              </Slider>}
            />
          </Main.FirstWrapGrid>)}
          <Main.FirstSliderIndex children={currentSlideIndex < 10 
            ? <>0{currentSlideIndex}&nbsp;<span>/ 0{editLists && editLists.length}</span></> 
            : <>{currentSlideIndex}&nbsp;<span>/ {editLists && editLists.length}</span></>}/>
    </Main.CommenLayout>
  );
}

export default MainFirst;
