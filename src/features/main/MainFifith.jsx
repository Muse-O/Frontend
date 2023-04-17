import React, { useEffect, useRef, useState } from 'react'
import * as Main from "./css/mainparts";
import { useEditLists } from '../../hooks/main/useEditLists';
import { fifithSliderList } from './mainpageexample/fifithSliderList';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Icons } from "../../features/main/css/mainparts";
// import * as StSlider from "./css/mainFirstSlider";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import styled from 'styled-components';

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      style={{
        position:"absolute",
        bottom:"0",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width: "63px",
        height: "63px",
        backgroundColor: "lightgray",
        borderRadius: "50px",
        zIndex:"1",

      }}
      onClick={onClick}>
      <Icons transform="58" children={<FaChevronLeft/>}/>
    </div>
  );
}

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
    style={{
      position:"absolute",
      bottom:"0",
      left:"232px",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      width: "63px",
      height: "63px",
      backgroundColor: "lightgray",
      borderRadius: "50px",
      zIndex:"1",
      
    }}
    onClick={onClick}>
    <Icons transform="43" children={<FaChevronRight/>}/>
  </div>
  );
}



function MainFifith() {
   // 서버로 부터 받아 온 배열을 슬라이더의 목적에 따라 가공하는 커스텀 훅
  const [EditList] = useEditLists(fifithSliderList);

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


  const mainSliderSettings = {
    asNavFor: subSlider,
    ref: slider => (mainSliderRef.current = slider),
    slidesToShow: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    infinite: true,
    dots: false,
    arrows: false,
    style:{maxWidth: "387px"}
  }

  const subSliderSettings = {
    className:"fifitSubSlider",
    asNavFor: mainSlider,
    ref: slider => (subSliderRef.current = slider),
    slidesToShow: 4,
    swipeToSlide: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    dots: false,
    arrows: true,
    prevArrow: <PrevArrow/>,
    nextArrow: <NextArrow/>,
    beforeChange:Indexhandler
  }

  return (
    <Main.CommenLayout height="637">
      <Main.ArticleTitle>
        <Main.MainH1 children="아트그램" />
      </Main.ArticleTitle>
      <Main.FifithWrap>
        {/* Fifth-MainSlider*/}
       <div>
       <Slider {...mainSliderSettings}>
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
          <Slider {...subSliderSettings}>
          {EditList.map((artgram) => (
            <Main.FifithSubSliderWrap key={artgram.id}>
             <div className="subsliderInner">
                        <div className="subsliderimg">
                          <img src={artgram.img} alt={artgram.img} width="100%"/>
                        </div>
                        <div className="profile">
                          <div className="profileimg"></div>
                          <div className="profileNickname"><p><span>by</span> userNickname</p></div>
                        </div>
                      </div>
            </Main.FifithSubSliderWrap>
          ))}
          </Slider>
          <CurrentSliderIndex>
            <p>
              0{currentSlideIndex} <span>/ 0{EditList.length}</span>
            </p>
          </CurrentSliderIndex>
        </Main.FifithSubSliderLayout>
      </Main.FifithWrap>
    </Main.CommenLayout>
  );
}

export default MainFifith

const CurrentSliderIndex = styled.div`
  position: absolute;
  left: 102px;
  bottom:0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 63px;
  font-family: 'Montserrat', sans-serif;

  p {
    font-size: 25px;
    font-weight: 700;
  }
  
  span {
    font-size: 20px;
    font-weight: 400;
  }
`
