import React from "react";
import * as Main from "./css/mainparts";
import { useEditLists } from "../../hooks/main/useEditLists";
import { fifithSliderList } from "./mainpageexample/fifithSliderList";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAsNavForSliderMainFifith } from "../../hooks/main/useAsNavForSliderMainFifith";


function MainFifith() {
  // 서버로 부터 받아 온 배열을 슬라이더의 목적에 따라 가공하는 커스텀 훅
  const [EditList] = useEditLists(fifithSliderList);
  const { firstSliderSettings, secondSliderSettings, currentSlideIndex } =
    useAsNavForSliderMainFifith();

  return (
    <Main.CommenLayout height="637">
      <Main.ArticleTitle>
        <Main.MainH1 children="아트그램" />
      </Main.ArticleTitle>
      <Main.FifithWrap>
        {/* Fifth-MainSlider*/}
        <div>
          <Slider {...firstSliderSettings}>
            {fifithSliderList.map((artgram) => (
              <Main.FifithMainSlider key={artgram.id}>
                <div className="artgramimg">
                  <img src={artgram.img} alt={artgram.img} width="100%" />
                </div>
                <div className="profile">
                  <div className="profileimg"></div>
                  <div className="profileNickname">
                    <p>
                      <span>by</span> userNickname
                    </p>
                  </div>
                </div>
              </Main.FifithMainSlider>
            ))}
          </Slider>
        </div>

        {/* Fifth-SubSlider*/}
        <Main.FifithSubSliderLayout>
          <Slider {...secondSliderSettings}>
            {EditList.map((artgram) => (
              <Main.FifithSubSliderWrap key={artgram.id}>
                <div className="subsliderInner">
                  <div className="subsliderimg">
                    <img src={artgram.img} alt={artgram.img} width="100%" />
                  </div>
                  <div className="profile">
                    <div className="profileimg"></div>
                    <div className="profileNickname">
                      <p>
                        <span>by</span> userNickname
                      </p>
                    </div>
                  </div>
                </div>
              </Main.FifithSubSliderWrap>
            ))}
          </Slider>
          <Main.FifthCurrentSliderIndex>
            <p>
              0{currentSlideIndex} <span>/ 0{EditList.length}</span>
            </p>
          </Main.FifthCurrentSliderIndex>
        </Main.FifithSubSliderLayout>
      </Main.FifithWrap>
    </Main.CommenLayout>
  );
}

export default MainFifith;
