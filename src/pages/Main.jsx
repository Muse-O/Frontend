import React, { useState, useEffect, useRef }  from "react";
import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import styled from "styled-components";
import { Flex } from "../components/Flex";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <CustomPrevButton
      onClick={onClick}>
      <Icons transform="58" children={<FaChevronLeft/>}/>
    </CustomPrevButton>
  );
}


function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <CustomNextButton
      onClick={onClick}>
      <Icons transform="43" children={<FaChevronRight/>}/>
    </CustomNextButton>
  );
}

function Main() {
  // Slider
  const [mainSlider, setMainSlider] = useState(null);
  const [subSlider, setSudSilder] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
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
    className:"slider2",
    asNavFor: mainSlider,
    ref: slider => (subSliderRef.current = slider),
    slidesToShow: 4, 
    swipeToSlide: true,
    focusOnSelect: true,
    autoplay: true, 
    autoplaySpeed: 2000,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    style:{position:"static", height:"344px", disploy:"flex", flexGrow:"1"},
    beforeChange: Indexhandler
  };

  const arr = [
    {id:1, title:"첫째"},
    {id:2, title:"둘째"},
    {id:3, title:"셋째"},
    {id:4, title:"넷째"},
    {id:5, title:"다섯째"},
    {id:6, title:"여섯째"}]
  const secondarr = [...arr]
  const secondarrEdit = secondarr.shift()
  secondarr.push(secondarrEdit)
  // console.log(arr, secondarr);

  const [exhibitionImg, setExhibitionImg] = useState("https://cdn.mhns.co.kr/news/photo/202109/511451_618343_3128.png")
  return (
    <>
      <Header />
      <Article>
        <MainWrap>
          <FirstDiv height="890">
            <MainH4 children="전시 종류" />
          </FirstDiv>
          <SecondDiv height="570">
            <MainH1 children="최신 전시 - 슬라이더 필요" />
            <SecondWrap ai="center" gap="23">
              {Array(6)
                .fill(null)
                .map((el,index) => (
                  <SecondInner key={index}>
                    <SecondImg />
                    <p className="firstP">제목</p>
                    <p className="secondP">2023.04.14-2023.04.20</p>
                    <p className="thirdP">위치</p>
                  </SecondInner>
                ))}
            </SecondWrap>
            <div
              style={{
                minWidth: "40px",
                minHeight: "40px",
                backgroundColor: "lightgray",
                borderRadius: "50px",
                position: "absolute",
                top: "10px",
                right: "0",
              }}
            ></div>
            <div
              style={{
                minWidth: "40px",
                minHeight: "40px",
                backgroundColor: "lightgray",
                borderRadius: "50px",
                position: "absolute",
                top: "10px",
                right: "64px",
              }}
            ></div>
          </SecondDiv>
          <ThirdDiv height="790">
            <MainH1 children="TOP 10" />
            <ThirdWrap gap="23" fw="wrap">
              {Array(10)
                .fill(null)
                .map((el, index) => (
                  <ThirdInner key={index}>
                    <div className="number">{index + 1}</div>
                    <div className="exhibition"></div>
                    <div className="innerText">
                      <p className="firstP">대지의 시간 The Time of Earth</p>
                      <p className="secondP">2023.04.14-2023.04.20</p>
                    </div>
                  </ThirdInner>
                ))}
            </ThirdWrap>
          </ThirdDiv>
          <FourthDiv height="655">
            <MainH1 children="예정 전시" />
            <FourthWrap>
              <div className="exhibitionimg" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <img src={exhibitionImg} style={{display:"block", height:"100%"}}/>
              </div>
              <div className="exhibitioninfo">
                {Array(4)
                  .fill(null)
                  .map((el,index) => {
                    const imgList = [
                      "https://cdn.mhns.co.kr/news/photo/202109/511451_618343_3128.png",
                      "https://lh3.googleusercontent.com/ci/AEwo86c9tUNWeu-V0oOSi2GEYXzm4sXCmTWVEiTAUzN3NzQVP4oGWi5BJBEIMKgWNLJ1fclBOUqdpm-X=s1200",
                      "https://culture.seoul.go.kr/cmmn/file/imageSrc.do?fileStreCours=35367259ca6485b8ea26e64a6b235a5388f602a39e9ec217640b29507de1c5f7&streFileNm=a75f86a05a9f5928192d72c7494fb1dfb18a99d5557d38731a0fdd08d3cbb619",
                      "https://magazine.brique.co/wp-content/uploads/2022/05/전시포스터.jpg"
                    ]
                  return (
                    <Exhibitioninfo key={index} onMouseOver={()=>setExhibitionImg(imgList[index])}>
                      <div className="date">
                        <p>30</p>
                        <p>Aug</p>
                      </div>
                      <div className="exhibitininfo">
                        <p>대지의 시간</p>
                        <p>The Time of Earth</p>
                      </div>
                      <div className="exhibitionlocation">
                        <p>서울 : 마이아트뮤지엄</p>
                      </div>
                    </Exhibitioninfo>
                  )})}
              </div>
            </FourthWrap>
          </FourthDiv>
          <FifithDiv height="800">
            <MainH1 children="아트그램" />
            <FifitInner>
              <SliderDiv>
                <Slider {...mainSlidersettings}>
                 {arr.map((el) =>(
                   <MainSliderWrap key={el.id}>
                   <div className="mainsliderimg">
                    <img alt={`${el.title} - ${el.id}`} width="100"/>
                   </div>
                   <div className="profile">
                    <div className="profileimg"></div>
                    <div className="profileNickname"><p><span>by</span> userNickname {el.id}</p></div>
                   </div>
                 </MainSliderWrap>
                 ))}
                </Slider>
                <SubSliderLayout>
                <Slider {...subSlidersettings}>
                  {secondarr.map((el) => (
                    <SubSliderWrap key={el.id}>
                      <div className="subsliderInner">
                        <div className="subsliderimg">
                          <img alt={`${el.title} - ${el.id}`} width="100"/>
                        </div>
                        <div className="profile">
                          <div className="profileimg"></div>
                          <div className="profileNickname"><p><span>by</span> userNickname {el.id}</p></div>
                        </div>
                      </div>
                    </SubSliderWrap>
                  ))}

                </Slider>
                </SubSliderLayout>
                <CustomIndex>
                  <p>{currentSlideIndex} <span>/ 6</span></p>
                </CustomIndex>
              </SliderDiv>
            </FifitInner>
          </FifithDiv>
        </MainWrap>
      </Article>
    </>
  );
}

export default Main;

const MainWrap = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  /* background-color: yellow; */
  margin: 65px 75px;
  color: #242424;
  font-family: 'SpoqaHanSansNeo-Regular';
`;

const FirstDiv = styled.div`
  width: 100%;
  background-color: #ff950098;;
  max-height: ${pos=>pos.height}px;
  min-height: ${pos=>pos.height}px;
`

const SecondDiv = styled.div`
  width: 100%;
  position: relative;
  /* background-color: #a6ff0097;; */
  max-height: ${pos=>pos.height}px;
  min-height: ${pos=>pos.height}px;
`

    const SecondWrap = styled(Flex)`
      /* background-color: white; */
      margin-top: 36px;
      max-width: 1525px;
      overflow: hidden;
    `

    const SecondInner = styled.div`
      min-width: 235px;
      max-width: 235px;
      min-height: 390px;
      max-height: 390px;
      background-color: lightgray;

      .firstP {
        margin-top: 24px;
        font-size: 20px;
      }
      .secondP{
        margin-top: 4px;
        font-size: 16px;
        color: #5A5A5A;
      }
      .thirdP{
        margin-top: 4px;
      }
    `

      const SecondImg = styled.img`
        background-color: #f2f2f2;
        display: block;
        min-width: 235px;
        max-width: 235px;
        min-height: 290px;
        max-height: 290px;
      `

const ThirdDiv = styled.div`
  width: 100%;
  /* background-color: #00eaff96;; */
  max-height: fit-content;
  min-height: ${pos=>pos.height}px;
`
    const ThirdWrap = styled(Flex)`
    margin-top: 36px;
    max-width: 1525px;
    padding-bottom: 24px;
    `

const ThirdInner = styled.div`
  min-width: 751px;
  max-width: 751px;
  min-height: 148px;
  max-height: 148px;
  margin-bottom: -23px;
  padding: 12px 0;
  border-bottom: 1px solid #D9D9D9;
  background-color: #f5f5f59a;
  display: grid;
  grid-template-columns: 100px 88px 1fr;

  .number{
    font-size: 20px;
  }
  .exhibition {
    min-width: 87px;
    max-width: 87px;
    min-height: 124px;
    max-height: 124px;
    background-color: lightgray;
  }

  .innerText {
    margin-left: 152px;
    padding: 47px 0;;

      .firstP {
        font-size: 20px;
        margin-bottom: 4px;
      }
      .secondP{
        color: #5A5A5A;
        font-size: 12px;
      }
  }
`

const FourthDiv = styled.div`
  position: relative;
  width: 100%;
  margin-top: 100px;
  /* background-color: #8c00ff95;; */
  max-height: ${pos=>pos.height}px;
  min-height: ${pos=>pos.height}px;
`

const FourthWrap = styled.div`
  position: relative;
  min-height: 480px;
  max-height: 480px;
  margin-top:36px;
  /* background-color: #f5f5f59a; */
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 80px;

  .exhibitionimg {
    min-width: 340px;
    max-width: 340px;
    min-height: 480px;
    max-height: 480px;
    /* background-color: #292929; */
  }
  .exhibitioninfo{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap:24px;
  }
  `

const Exhibitioninfo = styled.div`
  height: 102px;
  display: grid;
  grid-template-columns: 82px minmax(200px, 1fr) 250px;
  gap: 112px;
  border: 1px solid black;
  border-radius:8px;
  padding: 25px;
  &:hover {
    background-color: #232323;
    color: #E6E6E6;
  }
  .date {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }

  .exhibitininfo {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 16px;
    p:first-child {
      font-size: 20px;
    }
  }

  .exhibitionlocation {
    text-align: end;
    padding-right: 57px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const FifithDiv = styled.div`
  width: 100%;
  /* background-color: #ff007795;; */
  max-height: ${pos=>pos.height}px;
  min-height: ${pos=>pos.height}px;
`
const FifitInner = styled.div`
  /* background-color: #E6E6E6; */
  margin-top: 36px;
  min-height: 533px;
  max-height: 533px;
  position: relative;
`


const MainH1 = styled.h4`
  font-family: 'S-CoreDream-3Light';
  font-size: 32px;
`

const MainH4 = styled.h4`
  font-family: 'S-CoreDream-3Light';
  font-size: 24px;
`

const SliderDiv = styled.div`
  position:relative;
  display: grid;
  grid-template-columns: 364px 1fr;
  height:auto;

  .slider2 {
    position:absolute;
    top:90px;
    right:0;
    width: 450px;
    height: 100px;
  }
`

const MainSliderWrap = styled.div`
  box-sizing:border-box;
  position: relative;
  min-height:500px;
  max-width: 364px;
  padding: 16px;
  padding-bottom: 0;
  background-color: #E6E6E6;

  .mainsliderimg {
    background-color: skyblue;
    min-height: 374px;
    max-height: 374px;
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
const SubSliderWrap = styled.div`
  box-sizing:border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: lightcoral; */
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

const SubSliderLayout = styled.div`
  display: flex;
  /* background-color: lightcyan; */
  padding-left:50px;
`


const CustomPrevButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 464px;
    bottom: 0;
    width: 50px;
    height: 50px;
    transform: rotateY(-50%);
    background-color:rgba(80, 80, 80, 0.2);
    border-radius: 50px;
    color: black;
    z-index: 10;
`;

const CustomNextButton = styled(CustomPrevButton)`
      left: 654px;
`

const CustomIndex = styled.div`
  position: absolute;
  /* background-color: lightgray; */
  border-radius: 20px;
  width: 100px;
  height: 50px;
  bottom: 0;
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