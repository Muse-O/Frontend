import React from "react";
import * as Main from "./css/mainparts";
import * as StSlider from "./css/mainFirstSlider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Flex } from "../../components/Flex";
import { useAsNavForSliderMainFirst } from "../../hooks/main/useAsNavForSliderMainFirst";
import { useEditTime } from "../../hooks/main/useEditTime";
import { usePersonalExhibition } from "../../hooks/main/usePersonalExhibition";
import { useNavigator } from "../../hooks/main/useNavigator";

function MainFirst() {
  const { firstSliderSettings, secondSliderSettings, currentSlideIndex } = useAsNavForSliderMainFirst();
  const { editTimehandle } = useEditTime();
  const { navigatehandle } = useNavigator();
  const { isLoading, isError, data } = usePersonalExhibition();

  let editLists;
  if (data) {
    const editList = [...data];
    const editshiftitem = editList.shift();
    editList.push(editshiftitem);
    editLists = editList;
  }

  return (
    <Main.CommenLayout height="704">
      {/* MainFirst-FirstTitle:absolute 좌상단 고정 */}
      <Main.ArticleTitle>
        <Main.MainH4 children="개인전(온,프라인), API 설정 예정" />
      </Main.ArticleTitle>
      {/* MainFirst-Slider 부분 */}
      <Flex>
        {isLoading || isError || !data ? (
          <div>로딩 중... </div>
        ) : (
          <>
            {/* FirstMainSliderWrap ------------------------------------------------- */}
            <Main.FirstMainSliderWrap>
              {/* <Main.FirstMainSliderWrap> */}
              <Slider {...firstSliderSettings}>
                {data.map(exhibition => (
                  <StSlider.MainSliderOutline key={exhibition.exhibitionId}>
                    {/* 이미지 */}
                    <StSlider.MainSliderImg src={exhibition.postImage} />

                    <StSlider.FirstMainSliderTitleDesc>
                      {/* Num & Title */}
                      <StSlider.MainSliderTitle
                        children={
                          <>
                            <div className="titleNum">
                              {exhibition.index < 9
                                ? `0${exhibition.index}`
                                : `${exhibition.index}`}
                              .
                            </div>
                            <div className="title">
                              {exhibition.exhibitionTitle}
                            </div>
                          </>
                        }
                      />

                      {/* Desc */}
                      <StSlider.MainSliderDesc
                        children={exhibition.exhibitionDesc}
                      />
                    </StSlider.FirstMainSliderTitleDesc>

                    {/* 전시 상세페이지이동 */}
                    <StSlider.MainSliderLink
                      onClick={() => navigatehandle(exhibition.detailRouter)}
                      children={<p>자세히 보러가기</p>}
                    />

                    {/* 전시 상세정보, 기간, 장소, 작가정보 */}
                    <StSlider.MainSliderinfo
                      children={
                        <>
                          <p className="title">기간</p>
                          <p className="content">
                            {editTimehandle(exhibition.startDate)} -
                            {editTimehandle(exhibition.endDate)}
                          </p>
                          <p className="title">위치</p>
                          <p className="content">{exhibition.sido} {exhibition.location}</p>
                          <p className="title">작가</p>
                          <p className="content">
                            {exhibition.author.length === 1 
                              ? exhibition.author.map(author => `${author}`)
                              : exhibition.author.length < 5 
                              ? exhibition.author.map((author, index) => exhibition.author.length === index+1 ? `${author}` : `${author}, ` )
                              : `${exhibition.author[0]}외 ${exhibition.author.length -1}명`
                            }
                          </p>
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
                {editLists.map(exhibition => (
                  <StSlider.SubSliderOutline key={exhibition.exhibitionId}>
                    {/* 이미지 */}
                    <StSlider.SubSliderImg src={exhibition.postImage} />
                  </StSlider.SubSliderOutline>
                ))}
              </Slider>
              <StSlider.CurrentSliderIndex>
                <p>
                  {data.length < 10 
                    ? <>0{currentSlideIndex} <span>/ 0{data.length}</span></> 
                    : <>{currentSlideIndex} <span>/ {data.length}</span></>}
                </p>
              </StSlider.CurrentSliderIndex>
            </Main.FirstSubSliderWrap>
          </>
        )}
      </Flex>
    </Main.CommenLayout>
  );
}

export default MainFirst;
