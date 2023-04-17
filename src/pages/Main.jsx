import React, { useState, useEffect, useRef }  from "react";
import styled from "styled-components";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import { MainLayout } from "../features/main/css/mainparts";
import MainFirst from "../features/main/MainFirst";
import MainSecond from "../features/main/MainSecond";
import MainThird from "../features/main/MainThird";

import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import MainFourth from "../features/main/MainFourth";
import MainFifith from "../features/main/MainFifith";



function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <FifitCustomPrevButton
      onClick={onClick}>
      <Icons transform="58" children={<FaChevronLeft/>}/>
    </FifitCustomPrevButton>
  );
}

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <FifitCustomNextButton
      onClick={onClick}>
      <Icons transform="43" children={<FaChevronRight/>}/>
    </FifitCustomNextButton>
  );
}

function Main() {
  
  // 아트그램 Slider
  const [mainSlider, setMainSlider] = useState(null);
  const [subSlider, setSudSilder] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);
  const mainSliderRef = useRef(null);
  const subSliderRef = useRef(null);

  useEffect(() => {
    setMainSlider(mainSliderRef.current);
    setSudSilder(subSliderRef.current);
  }, []);

  const mainSlidersettings = {
    asNavFor: subSlider,
    dots: false,
    arrows: false,
    ref: slider => (mainSliderRef.current = slider),
    style:{position:"relative"}
  };

  const Indexhandler = (oldIndex, newIndex) => {
    setCurrentSlideIndex(newIndex+1)
  }

  const subSlidersettings = {
    className:"fifitSubSlider",
    asNavFor: mainSlider,
    ref: slider => (subSliderRef.current = slider),
    slidesToShow: 4, 
    swipeToSlide: true,
    focusOnSelect: true,
    autoplay: true, 
    autoplaySpeed: 2000,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    beforeChange: Indexhandler
  };

  const arr = [
    {id:1, title:"첫째", nickName : "Edwin-Author", img: "https://cdn.mhns.co.kr/news/photo/202109/511451_618343_3128.png"},
    {id:2, title:"둘째", nickName : "Edwin-Author", img: "https://lh3.googleusercontent.com/ci/AEwo86c9tUNWeu-V0oOSi2GEYXzm4sXCmTWVEiTAUzN3NzQVP4oGWi5BJBEIMKgWNLJ1fclBOUqdpm-X=s1200"},
    {id:3, title:"셋째", nickName : "Edwin-Author", img: "https://culture.seoul.go.kr/cmmn/file/imageSrc.do?fileStreCours=35367259ca6485b8ea26e64a6b235a5388f602a39e9ec217640b29507de1c5f7&streFileNm=a75f86a05a9f5928192d72c7494fb1dfb18a99d5557d38731a0fdd08d3cbb619"},
    {id:4, title:"넷째", nickName : "Edwin-Author", img: "https://lh3.googleusercontent.com/ci/AEwo86c9tUNWeu-V0oOSi2GEYXzm4sXCmTWVEiTAUzN3NzQVP4oGWi5BJBEIMKgWNLJ1fclBOUqdpm-X=s1200"},
    {id:5, title:"다섯째", nickName : "Edwin-Author", img: "https://cdn.mhns.co.kr/news/photo/202109/511451_618343_3128.png"},
    {id:6, title:"여섯째", nickName : "Edwin-Author", img: "https://culture.seoul.go.kr/cmmn/file/imageSrc.do?fileStreCours=35367259ca6485b8ea26e64a6b235a5388f602a39e9ec217640b29507de1c5f7&streFileNm=a75f86a05a9f5928192d72c7494fb1dfb18a99d5557d38731a0fdd08d3cbb619"}]
  const secondarr = [...arr]
  const secondarrEdit = secondarr.shift()
  secondarr.push(secondarrEdit)



  return (
    <>
      <Header />
      <Article>
        <MainLayout>
          <MainFirst />
          <MainSecond />
          <MainThird />
          <MainFourth />
          <MainFifith />

          <FifithDiv height="800">
            <MainH1 children="아트그램" />
            <FifitWrap>
              {/* <FifitSliderWrap> */}
                <Slider {...mainSlidersettings}>
                 {arr.map((el) =>(
                   <FifitMainSlider key={el.id}>
                   <div className="artgramimg">
                    <img src={el.img} alt={`${el.title} - ${el.id}`} width="100%"/>
                   </div>
                   <div className="profile">
                    <div className="profileimg"></div>
                    <div className="profileNickname"><p><span>by</span> userNickname {el.id}</p></div>
                   </div>
                 </FifitMainSlider>
                 ))}
                </Slider>
                <FifithSubSliderLayout>
                <Slider {...subSlidersettings}>
                  {secondarr.map((el) => (
                    <FifithSubSliderWrap key={el.id}>
                      <div className="subsliderInner">
                        <div className="subsliderimg">
                          <img src={el.img} alt={`${el.title} - ${el.id}`} width="100%"/>
                        </div>
                        <div className="profile">
                          <div className="profileimg"></div>
                          <div className="profileNickname"><p><span>by</span> userNickname {el.id}</p></div>
                        </div>
                      </div>
                    </FifithSubSliderWrap>
                  ))}
                </Slider>
                </FifithSubSliderLayout>
                <FifitCustomIndex>
                  <p>{currentSlideIndex} <span>/ 6</span></p>
                </FifitCustomIndex>
              {/* </FifitSliderWrap> */}
            </FifitWrap>
          </FifithDiv>
        </MainLayout>
      </Article>
    </>
  );
}

export default Main;

const FifithDiv = styled.div`
  width: 100%;
  /* background-color: #ff007795;; */
  max-height: ${pos=>pos.height}px;
  min-height: ${pos=>pos.height}px;
`
const FifitWrap = styled.div`
  /* background-color: #E6E6E6; */
  margin-top: 36px;
  min-height: 538px;
  max-height: 538px;
  position: relative;
  display: grid;
  grid-template-columns: 364px 1fr;
  height:auto;

  // 선언될 SubSlider의 스타일을 설정
  .fifitSubSlider {
  position:static;  
  display: flex;
  flex-grow:1;
  width: 0;
  padding-left:50px;
  }
`

const MainH1 = styled.h4`
  font-family: 'S-CoreDream-3Light';
  font-size: 32px;
`

const FifitMainSlider = styled.div`
  position: relative;
  min-height:533px;
  max-width: 364px;
  padding: 16px;
  padding-bottom: 0;
  background-color: #E6E6E6;

  .artgramimg {
    background-color: skyblue;
    min-height: 374px;
    max-height: 374px;
    overflow: hidden;
  }

  .profile {
    position: absolute;
    bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .profileimg {
    display: inline-block;
    width: 29px;
    height: 29px;
    background-color:lightgray;
    border-radius: 50px;
  }

  .profileNickname {
    height: 29px;
    display: flex;
    align-items: center;
    font-size: 13px;

    span {
      color:#8C8C8C;
    }
  }
`
const FifithSubSliderWrap = styled.div`
  box-sizing:border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 42px;

  .subsliderInner {
    background-color: #E6E6E6;
    position: relative;
    width: 235px;
    min-height: 344px;
    max-height: 344px;
    margin-bottom: 73px;
    padding: 11px;
  }

  .subsliderimg {
    background-color: lightgreen;
    height: 242px;
    overflow: hidden;
  }

  .profile {
    position: absolute;
    bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .profileimg {
    display: inline-block;
    width: 29px;
    height: 29px;
    background-color:lightgray;
    border-radius: 50px;
  }

  .profileNickname {
    display: inline-block;
    height: 29px;
    display: flex;
    align-items: center;
    font-size: 13px;

    span {
      color:#8C8C8C;
    }
  }  
`

const FifithSubSliderLayout = styled.div`
  display: flex;
`


const FifitCustomPrevButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 464px;
    bottom: 5px;
    width: 50px;
    height: 50px;
    transform: rotateY(-50%);
    background-color:rgba(80, 80, 80, 0.2);
    border-radius: 50px;
    color: black;
    z-index: 10;
`;

const FifitCustomNextButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 654px;
  bottom: 5px;
  width: 50px;
  height: 50px;
  transform: rotateY(-50%);
  background-color:rgba(80, 80, 80, 0.2);
  border-radius: 50px;
  color: black;
  z-index: 10;
    
`

const FifitCustomIndex = styled.div`
  position: absolute;
  /* background-color: lightgray; */
  border-radius: 20px;
  width: 100px;
  height: 50px;
  bottom: 5px;
  left:534px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  p {
    font-size: 25px;
    font-weight: 700;
  }
  span {
    font-size: 20px;
    font-weight: 400;
  }
`

const Icons = styled.div`
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-${pos => pos.transform}%, -50%);
  font-size: 2.8rem;
  color: red;
  text-align: center;
`;
