import React, { useState, useEffect, useRef }  from "react";
import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import styled from "styled-components";
import { Flex } from "../components/Flex";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

function FirstPrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      style={{
        width: "63px",
        height: "63px",
        backgroundColor: "lightgray",
        borderRadius: "50px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        right:"220px",  
        bottom:"-368.5px"

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
      width: "63px",
      height: "63px",
      backgroundColor: "lightgray",
      borderRadius: "50px",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      position:"absolute",
      right:"75px",
      bottom:"-368.5px"
    }}
    onClick={onClick}>
    <Icons transform="43" children={<FaChevronRight/>}/>
  </div>
  );
}


function SecondPrevArrow(props) {
  const { onClick } = props;
  return (
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
      onClick={onClick}>
      <Icons transform="58" children={<FaChevronLeft/>}/>
    </div>
  );
}

function SecondNextArrow(props) {
  const { onClick } = props;
  return (
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
    onClick={onClick}>
    <Icons transform="43" children={<FaChevronRight/>}/>
  </div>
  );
}

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
  /// 전시 종류 Slider 
  const [firstmainSlider, setFirstMainSlider] = useState(null);
  const [firstsubSlider, setFirstSudSilder] = useState(null);
  const [firstcurrentSlideIndex, setFirstCurrentSlideIndex] = useState(1);
  const firstmainSliderRef = useRef(null);
  const firstsubSliderRef = useRef(null);

  const firstMainSlidersettings = {
    asNavFor: firstsubSlider,
    dots: false,
    arrows: false,
    ref: slider => (firstmainSliderRef.current = slider),
    style:{position:"relative"}
  }

  const FirstIndexhandler = (oldIndex, newIndex) => {
    setFirstCurrentSlideIndex(newIndex+1)
  }

  const firstSubSlidersetting = {
      asNavFor: firstmainSlider,
      ref: slider => (firstsubSliderRef.current = slider),
      slidesToShow: 1, 
      swipeToSlide: true,
      focusOnSelect: true,
      autoplay: true, 
      autoplaySpeed: 4000,
      arrows:true,
      prevArrow: <FirstPrevArrow/>,
      nextArrow: <FirstNextArrow/>,
      beforeChange: FirstIndexhandler,
      style:{width:"344px", height:"304px", backgroundColor:"lightyellow", position:"absolute", top:"0", right:"-75px"},
    }; 



  useEffect(() => {
    setFirstMainSlider(firstmainSliderRef.current);
    setFirstSudSilder(firstsubSliderRef.current);
  }, []);

  /// 최신전시 Slider
  const newestSlidersettings = {
    slidesToShow: 6, 
    swipeToSlide: true,
    focusOnSelect: true,
    autoplay: true, 
    autoplaySpeed: 2000,
    infinite: true,
    dots: false,
    arrows: true,
    prevArrow: <SecondPrevArrow/>,
    nextArrow: <SecondNextArrow/>,
    style:{marginTop:"36px", position:"static"}, 
  };


  
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
    {id:1, title:"첫째", img: "https://cdn.mhns.co.kr/news/photo/202109/511451_618343_3128.png"},
    {id:2, title:"둘째", img: "https://lh3.googleusercontent.com/ci/AEwo86c9tUNWeu-V0oOSi2GEYXzm4sXCmTWVEiTAUzN3NzQVP4oGWi5BJBEIMKgWNLJ1fclBOUqdpm-X=s1200"},
    {id:3, title:"셋째", img: "https://culture.seoul.go.kr/cmmn/file/imageSrc.do?fileStreCours=35367259ca6485b8ea26e64a6b235a5388f602a39e9ec217640b29507de1c5f7&streFileNm=a75f86a05a9f5928192d72c7494fb1dfb18a99d5557d38731a0fdd08d3cbb619"},
    {id:4, title:"넷째", img: "https://lh3.googleusercontent.com/ci/AEwo86c9tUNWeu-V0oOSi2GEYXzm4sXCmTWVEiTAUzN3NzQVP4oGWi5BJBEIMKgWNLJ1fclBOUqdpm-X=s1200"},
    {id:5, title:"다섯째", img: "https://cdn.mhns.co.kr/news/photo/202109/511451_618343_3128.png"},
    {id:6, title:"여섯째", img: "https://culture.seoul.go.kr/cmmn/file/imageSrc.do?fileStreCours=35367259ca6485b8ea26e64a6b235a5388f602a39e9ec217640b29507de1c5f7&streFileNm=a75f86a05a9f5928192d72c7494fb1dfb18a99d5557d38731a0fdd08d3cbb619"}]
  const secondarr = [...arr]
  const secondarrEdit = secondarr.shift()
  secondarr.push(secondarrEdit)

  const [exhibitionImg, setExhibitionImg] = useState("https://cdn.mhns.co.kr/news/photo/202109/511451_618343_3128.png")


  return (
    <>
      <Header />
      <Article>
        <MainLayout>
          <FirstDiv height="825">
            <div className="firstdivtitle" style={{position:"absolute", top:"0", left:"0", zIndex:"10"}}>
              <MainH4 children="전시 종류"/>
            </div>
            <FirstSliderWrap>
              <Slider {...firstMainSlidersettings}>
                  {Array(5).fill(null).map((el, index) => (
                    <div key={index} >
                      {/* 이미지 */}
                      <div style={{width:"492px", height:"702px", backgroundColor:"lightcyan", margin:"0 auto"}}>
                       <img width="100%" src="https://culture.seoul.go.kr/cmmn/file/imageSrc.do?fileStreCours=35367259ca6485b8ea26e64a6b235a5388f602a39e9ec217640b29507de1c5f7&streFileNm=a75f86a05a9f5928192d72c7494fb1dfb18a99d5557d38731a0fdd08d3cbb619"/>
                      </div>  
                      {/* Num & Title */}
                      <div style={{width:"fit-content", height:"96px", position:"absolute", top:"134px", display:"grid", gridTemplateColumns:"56px 1fr", alignItems:"center"}}>
                        <div style={{fontSize: "24px"}}>{index < 9 ? `0${index+1}` : `${index+1}`}.</div>
                        <div style={{fontSize: "80px"}}>대지의 시간</div>
                      </div>
                      {/* Desc */}
                      <div style={{width:"339px", height:"96px", position:"absolute", top:"344px", wordBreak:"break-all", textAlign:"justify", lineHeight: "25px"}}>
                        ⟪대지의 시간⟫은 기후변화와 펜데믹 등 전 지구적 위기 시대를 맞이하여 새로운 시대정신으로 떠오르고 있는 '생태학적 세계관'을 탐색하는 장으로서, '공생', '연결', '균형의 회복'을 지향하는 국내외 작가 16명의 작품과 아카이브를 선보인다.
                      </div>
                      {/* 전시 상세페이지이동 */}
                      <div style={{minWidth:"314px", height:"70px", position:"absolute", top:"632px", backgroundColor:"#D9D9D9", borderRadius:"50px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <p>자세히 보러가기</p>
                      </div>
                      <div style={{position:"absolute", top:"344px", transform:"translateX(-300px)"}}>
                        <p>기간</p>
                        <p>2023.04.12-2023.04.12</p>
                        <p>위치</p>
                        <p>과천 현대미술관</p>
                        <p>작가</p>
                        <p>홍길동 외 5인</p>
                      </div>
                    </div>
                  ))}
                </Slider>
            </FirstSliderWrap>
            <div>
            <Slider {...firstSubSlidersetting}>
                <div>1sub</div>
                <div>2sub</div>
                <div>3sub</div>
                <div>4sub</div>
                <div>5sub</div>
              </Slider>
            </div>
            <FirstCustomIndex>
                  <p>{firstcurrentSlideIndex} <span>/ 6</span></p>
            </FirstCustomIndex>
          </FirstDiv>


          <SecondDiv height="570">
            <MainH1 children="최신 전시" />
              <Slider {...newestSlidersettings}>
                {최신전시.map((el,index) => (
                      <SecondSlider key={index}>
                        <img className="sliderImg" src={el.img}/>
                        <p className="sliderTitle">{el.title}</p>
                        <p className="sliderdate">{el.date}</p>
                        <p className="sliderLocation">{el.location}</p>
                      </SecondSlider>
                    ))}
              </Slider>
          </SecondDiv>
          <ThirdDiv height="790">
            <MainH1 children="TOP 10" />
            <ThirdWrap gap="23" fw="wrap">
              {Array(10)
                .fill(null)
                .map((el, index) => (
                  <ThirdInner key={index}>
                    <div className="number">{index + 1}</div>
                    <div className="exhibitionimg"></div>
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
                    <FourthExhibitioninfo key={index} onMouseOver={()=>setExhibitionImg(imgList[index])}>
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
                    </FourthExhibitioninfo>
                  )})}
              </div>
            </FourthWrap>
          </FourthDiv>
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

const MainLayout = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  /* background-color: yellow; */
  margin: 65px 75px;
  color: #242424;
  font-family: 'SpoqaHanSansNeo-Regular';
`;

const FirstDiv = styled.div`
  position: relative;
  /* display: flex; */
  /* align-items: center;  */
  width: 100%;
  /* background-color: #ff950098;; */
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

    const SecondSlider = styled.div`
      min-width: 235px;
      max-width: 235px;
      min-height: 390px;
      max-height: 390px;
      background-color: lightgray;

      .sliderImg {
          display: block;
          min-width: 235px;
          max-width: 235px;
          min-height: 290px;
          max-height: 290px;
          background-color: #f2f2f2;
        }

      .sliderTitle {
        margin-top: 24px;
        font-size: 20px;
      }
      .sliderdate{
        margin-top: 4px;
        font-size: 16px;
        color: #5A5A5A;
      }
      .sliderLocation{
        margin-top: 4px;
      }
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
  .exhibitionimg {
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

const FourthExhibitioninfo = styled.div`
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

const MainH4 = styled.h4`
  font-family: 'S-CoreDream-3Light';
  font-size: 24px;
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

const FirstCustomIndex = styled.div`
  position: absolute;
  border-radius: 20px;
  width: 100px;
  height: 50px;
  bottom: 160px;
  left:1371.25px;
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
  bottom: 160px;
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

const FirstSliderWrap = styled.div`
  max-width: 1256px;
  width: 1256px;
  height: 825px;
  /* background-color: lightcoral; */
`

const 최신전시 = [
  {img : "https://cdn.mhns.co.kr/news/photo/202109/511451_618343_3128.png", title:"제목1", date:"2023.03-14-2023.04.20", location:"서울 : 마이아트뮤지엄"},
  {img : "https://lh3.googleusercontent.com/ci/AEwo86c9tUNWeu-V0oOSi2GEYXzm4sXCmTWVEiTAUzN3NzQVP4oGWi5BJBEIMKgWNLJ1fclBOUqdpm-X=s1200", title:"제목2", date:"2023.03-14-2023.04.20", location:"서울 : 마이아트뮤지엄"},
  {img : "https://culture.seoul.go.kr/cmmn/file/imageSrc.do?fileStreCours=35367259ca6485b8ea26e64a6b235a5388f602a39e9ec217640b29507de1c5f7&streFileNm=a75f86a05a9f5928192d72c7494fb1dfb18a99d5557d38731a0fdd08d3cbb619", title:"제목", date:"2023.03-14-2023.04.20", location:"서울 : 마이아트뮤지엄"},
  {img : "https://magazine.brique.co/wp-content/uploads/2022/05/전시포스터.jpg", title:"제목3", date:"2023.03-14-2023.04.20", location:"서울 : 마이아트뮤지엄"},
  {img : "https://cdn.mhns.co.kr/news/photo/202109/511451_618343_3128.png", title:"제목4", date:"2023.03-14-2023.04.20", location:"서울 : 마이아트뮤지엄"},
  {img : "https://lh3.googleusercontent.com/ci/AEwo86c9tUNWeu-V0oOSi2GEYXzm4sXCmTWVEiTAUzN3NzQVP4oGWi5BJBEIMKgWNLJ1fclBOUqdpm-X=s1200", title:"제목5", date:"2023.03-14-2023.04.20", location:"서울 : 마이아트뮤지엄"},
  {img : "https://culture.seoul.go.kr/cmmn/file/imageSrc.do?fileStreCours=35367259ca6485b8ea26e64a6b235a5388f602a39e9ec217640b29507de1c5f7&streFileNm=a75f86a05a9f5928192d72c7494fb1dfb18a99d5557d38731a0fdd08d3cbb619", title:"제목6", date:"2023.03-14-2023.04.20", location:"서울 : 마이아트뮤지엄"},
  {img : "https://magazine.brique.co/wp-content/uploads/2022/05/전시포스터.jpg", title:"제목7", date:"2023.03-14-2023.04.20", location:"서울 : 마이아트뮤지엄"},
  {img : "https://cdn.mhns.co.kr/news/photo/202109/511451_618343_3128.png", title:"제목8", date:"2023.03-14-2023.04.20", location:"서울 : 마이아트뮤지엄"},
  {img : "https://lh3.googleusercontent.com/ci/AEwo86c9tUNWeu-V0oOSi2GEYXzm4sXCmTWVEiTAUzN3NzQVP4oGWi5BJBEIMKgWNLJ1fclBOUqdpm-X=s1200", title:"제목9", date:"2023.03-14-2023.04.20", location:"서울 : 마이아트뮤지엄"},
  {img : "https://culture.seoul.go.kr/cmmn/file/imageSrc.do?fileStreCours=35367259ca6485b8ea26e64a6b235a5388f602a39e9ec217640b29507de1c5f7&streFileNm=a75f86a05a9f5928192d72c7494fb1dfb18a99d5557d38731a0fdd08d3cbb619", title:"제목10", date:"2023.03-14-2023.04.20", location:"서울 : 마이아트뮤지엄"},
  {img : "https://magazine.brique.co/wp-content/uploads/2022/05/전시포스터.jpg", title:"제목11", date:"2023.03-14-2023.04.20", location:"서울 : 마이아트뮤지엄"},
  {img : "https://cdn.mhns.co.kr/news/photo/202109/511451_618343_3128.png", title:"제목12", date:"2023.03-14-2023.04.20", location:"서울 : 마이아트뮤지엄"},
  {img : "https://lh3.googleusercontent.com/ci/AEwo86c9tUNWeu-V0oOSi2GEYXzm4sXCmTWVEiTAUzN3NzQVP4oGWi5BJBEIMKgWNLJ1fclBOUqdpm-X=s1200", title:"제목13", date:"2023.03-14-2023.04.20", location:"서울 : 마이아트뮤지엄"},
  {img : "https://culture.seoul.go.kr/cmmn/file/imageSrc.do?fileStreCours=35367259ca6485b8ea26e64a6b235a5388f602a39e9ec217640b29507de1c5f7&streFileNm=a75f86a05a9f5928192d72c7494fb1dfb18a99d5557d38731a0fdd08d3cbb619", title:"제목14", date:"2023.03-14-2023.04.20", location:"서울 : 마이아트뮤지엄"},
  {img : "https://magazine.brique.co/wp-content/uploads/2022/05/전시포스터.jpg", title:"제목15", date:"2023.03-14-2023.04.20", location:"서울 : 마이아트뮤지엄"}
]