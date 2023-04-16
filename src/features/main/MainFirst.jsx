import React, { useEffect, useRef, useState } from "react";
import * as Main from "./mainparts";
import * as StSlider from "./mainFirstSlider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Flex } from "../../components/Flex";
import { firstSliderList } from "./mainpageexample/firstSliderList";
// import { useNavigate } from "react-router-dom";
import { useEditLists } from "../../hooks/main/useEditLists";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import styled from "styled-components";


function MainFirst() {
  const [mainSlider, setMainSlider] = useState(null);
  const [subSlider, setSudSilder] = useState(null);
  const mainSliderRef = useRef(null);
  const subSliderRef = useRef(null);

  useEffect(() => {
    setMainSlider(mainSliderRef.current);
    setSudSilder(subSliderRef.current);
  }, []);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);
  const Indexhandler = (oldIndex, newIndex) => {
    setCurrentSlideIndex(newIndex+1)
  }

  const firstSliderSettings = {
    asNavFor: subSlider,
    ref: slider => (mainSliderRef.current = slider),
    slidesToShow: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    dots: false,
    arrows: false,
  };
  const secondSliderSettings = {
    asNavFor: mainSlider,
    ref: slider => (subSliderRef.current = slider),
    slidesToShow: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    dots: false,
    arrows: true,
    prevArrow: <FirstPrevArrow/>,
    nextArrow: <FirstNextArrow/>,
    beforeChange:Indexhandler
  };

  // 전시회 상세페이지로 이동하는 Router
  // const navigate = useNavigate();

  // editTimehandle 서버로부터 받아온 시간을 변경하는 handle
  const editTimehandle = (times) => {
    return times.split("T")[0].replace("-", ".");
  };

  // 서버로 부터 받아 온 배열을 슬라이더의 목적에 따라 가공하는 커스텀 훅
  const [firstEditList] = useEditLists(firstSliderList);

  return (
    <Main.CommenLayout height="825">
      {/* MainFirst-FirstTitle:absolute 좌상단 고정 */}
      <Main.FirstTitle>
        <Main.MainH4 children="전시 종류, API 설정 예정" />
      </Main.FirstTitle>
      {/* MainFirst-Slider 부분 */}
      <Flex>
        {/* FirstMainSliderWrap ------------------------------------------------- */}
        <Main.FirstMainSliderWrap style={{ backgroundColor: "#eef08082" }}>
          {/* <Main.FirstMainSliderWrap> */}
          <Slider {...firstSliderSettings}>
            {firstSliderList.map((exhibitionList, index) => (
              <StSlider.MainSliderOutline key={index}>
                {/* 이미지 */}
                <StSlider.MainSliderImg src={exhibitionList.imglink} />

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
        <Main.FirstSubSliderWrap style={{ backgroundColor: "#80f09e82" }}>
          <Slider {...secondSliderSettings}>
            {firstEditList.map((exhibitionList, index) => (
              <StSlider.SubSliderOutline key={index}>
                <StSlider.SubSliderImg src={exhibitionList.imglink} />
              </StSlider.SubSliderOutline>
            ))}
          </Slider>
          <StSlider.CurrentSliderIndex>
            <p>{currentSlideIndex} <span>/ 6</span></p>
          </StSlider.CurrentSliderIndex>
        </Main.FirstSubSliderWrap>
      </Flex>
    </Main.CommenLayout>
  );
}

export default MainFirst;

function FirstPrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      style={{
        position:"absolute",
        bottom:"0",
        zIndex:"1",
        width: "63px",
        height: "63px",
        backgroundColor: "lightgray",
        borderRadius: "50px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
      }}
      onClick={onClick}>
      <Icons transform="58" children={<FaChevronLeft/>}/>
    </div>
  );
}

function FirstNextArrow(props) {
  const { onClick } = props;
  return (
    <div
    style={{
      position:"absolute",
      bottom:"0",
      right:"0",
      zIndex:"1",
      width: "63px",
      height: "63px",
      backgroundColor: "lightgray",
      borderRadius: "50px",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
    }}
    onClick={onClick}>
    <Icons transform="43" children={<FaChevronRight/>}/>
  </div>
  );
}

const Icons = styled.div`
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-${pos => pos.transform}%, -50%);
  font-size: 2.8rem;
  color: red;
  text-align: center;
`;
