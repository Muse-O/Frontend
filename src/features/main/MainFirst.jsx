import React from "react";
import * as Main from "./css/mainparts";
import * as StSlider from "./css/mainFirstSlider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Flex } from "../../components/Flex";
import { firstSliderList } from "./mainpageexample/firstSliderList";
import { useEditLists } from "../../hooks/main/useEditLists";
import { useAsNavForSliderMainFirst } from "../../hooks/main/useAsNavForSliderMainFirst";
import { useEditTime } from "../../hooks/main/useEditTime";



function MainFirst() {
  // Slider(AsNavFor)를 위한 커스텀 훅(커스텀 버튼 포함)
  const {firstSliderSettings, secondSliderSettings, currentSlideIndex} = useAsNavForSliderMainFirst()
  // 서버에서 제공받은 시간을 가공하기 위해 만든 커스컴 훅
  const {editTimehandle} = useEditTime()
  // 서버로 부터 받아 온 배열을 슬라이더의 목적에 따라 가공하는 커스텀 훅
  const [EditList] = useEditLists(firstSliderList);

  return (
    <Main.CommenLayout height="704">
      {/* MainFirst-FirstTitle:absolute 좌상단 고정 */}
      <Main.ArticleTitle>
        <Main.MainH4 children="개인전(온,프라인), API 설정 예정" />
      </Main.ArticleTitle>
      {/* MainFirst-Slider 부분 */}
      <Flex>
        {/* FirstMainSliderWrap ------------------------------------------------- */}
        <Main.FirstMainSliderWrap>
          {/* <Main.FirstMainSliderWrap> */}
          <Slider {...firstSliderSettings}>
            {firstSliderList.map((exhibitionList, index) => (
              <StSlider.MainSliderOutline key={index}>
                {/* 이미지 */}
                <StSlider.MainSliderImg src={exhibitionList.imglink} />

                <StSlider.FirstMainSliderTitleDesc>
                  {/* Num & Title */}
                  <StSlider.MainSliderTitle
                    children={
                      <>
                        <div className="titleNum">
                          {exhibitionList.num < 9
                            ? `0${exhibitionList.num}`
                            : `${exhibitionList.num}`}
                          .
                        </div>
                        <div className="title">
                          {exhibitionList.exhibitionTitle}
                        </div>
                      </>
                    }
                  />

                  {/* Desc */}
                  <StSlider.MainSliderDesc
                    children={exhibitionList.exhibitionDesc}
                  />
                </StSlider.FirstMainSliderTitleDesc>

                {/* 전시 상세페이지이동 */}
                <StSlider.MainSliderLink
                  onClick={() => alert("기능 구현 중")}
                  children={<p>자세히 보러가기</p>}
                />

                {/* 전시 상세정보, 기간, 장소, 작가정보 */}
                <StSlider.MainSliderinfo
                  children={
                    <>
                      <p className="title">기간</p>
                      <p className="content">
                        {editTimehandle(exhibitionList.startDate)} -
                        {editTimehandle(exhibitionList.endDate)}
                      </p>
                      <p className="title">위치</p>
                      <p className="content">{exhibitionList.address}</p>
                      <p className="title">작가</p>
                      <p className="content">{exhibitionList.writerNickName}</p>
                    </>
                  }
                />
              </StSlider.MainSliderOutline>
            ))}
          </Slider>
        </Main.FirstMainSliderWrap>

        {/* FirstSubSliderWrap -------------------------------------------------- */}
        <Main.FirstSubSliderWrap>
          <Slider {...secondSliderSettings}>
            {EditList.map((exhibitionList, index) => (
              <StSlider.SubSliderOutline key={index}>
                {/* 이미지 */}
                <StSlider.SubSliderImg src={exhibitionList.imglink} />
              </StSlider.SubSliderOutline>
            ))}
          </Slider>
          <StSlider.CurrentSliderIndex>
            <p>
              0{currentSlideIndex} <span>/ 0{firstSliderList.length}</span>
            </p>
          </StSlider.CurrentSliderIndex>
        </Main.FirstSubSliderWrap>
      </Flex>
    </Main.CommenLayout>
  );
}

export default MainFirst;