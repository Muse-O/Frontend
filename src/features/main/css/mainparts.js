import styled from "styled-components";
import { Flex } from "../../../components/Flex";

// Main 페이지 전체 레이아웃 및 개별 태그들에 대한 위치설정 ////////////////////////////////////////////////////
// Main 페이지 - 전체를 감싸는 태그 
const MainLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 65px 75px;
  color: #242424;
  font-family: 'SpoqaHanSansNeo-Regular';
`;

// Main 페이지 첫번째(1,2,5) 전시 종류
const CommenLayout = styled.div`
  position: relative;
  width: 100%;
  max-height: ${pos=>pos.height}px;
  min-height: ${pos=>pos.height}px;
  /* overflow: hidden; */
  margin-bottom: 160px;
`
// Main 페이지 세번째(3) TOP 10 (화면의 너미가 줄어들었을 때를 가정)
const ThirdLayout = styled(CommenLayout)`
  max-height: fit-content;
`
// Main 페이지 - 소제목 absolute 좌상단 고정
const ArticleTitle = styled.div`
  position:absolute;
  top:5px;
  left:0;
  z-index:1;
`

//  Main 페이지 - 소제목(2,3,4,5 번째)
const MainH1 = styled.h4`
  font-family: 'S-CoreDream-3Light';
  font-size: 32px;
  `

//  Main 페이지 - 소제목(1 번째)
const MainH4 = styled.h4`
  font-family: 'S-CoreDream-3Light';
  font-size: 20px;
  `

// Main 개별 태그들에 대한 상세설정 //////////////////////////////////////////////////////////////////////
// ---------------------------------------------------------------------------------- //
// Main 페이지 첫번째(1) 슬라이더 레이아웃
const FirstMainSliderWrap = styled.div`
  position: relative;
  max-width: 1256px;
  width: 1256px;
  height: 704px;
`
// Main 페이지 첫번째(1) 슬라이더 스타일설정
const FirstSubSliderWrap = styled.div`
  position: relative;
  max-width: 269px;
  width: 269px;
  height: 704px;
`


// ---------------------------------------------------------------------------------- //
// Main 페이지 두번째(2) 슬라이더 스타일설정
const SecondSliderWrap = styled(FirstMainSliderWrap)`
  position: static;
  margin-top: 66px;
  max-width: 1545px;
  width: 1545px;
  height: 393px;
  background-color: lightgoldenrodyellow;
`


const SecondSlider = styled.div`
  min-width: 235px;
  max-width: 235px;
  min-height: 393px;
  max-height: 393px;
  // 추후 색상 변경예정
  background-color: lightgray; 

  // Main 페이지 두번째(2) 슬라이더의 info(이미지, 제목, 날짜, 위치)
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

// ---------------------------------------------------------------------------------- //
// Main 페이지 세번째(3) TOP10 상세 레이아웃
const ThirdWrap = styled(Flex)`
  margin-top: 66px;
  max-width: 1525px;
  padding-bottom: 24px;
`

// Main 페이지 세번째(3) TOP10 개별 영역설정
const ThirdInner = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 100px 88px 1fr;
  min-width: 751px;
  max-width: 751px;
  min-height: 148px;
  max-height: 148px;
  margin-bottom: -23px;
  padding: 12px 0;
  border-bottom: 1px solid #D9D9D9;
  background-color: #f5f5f59a;
  
  .number{
    p{
      font-size: 20px;
      line-height: 124px;
    }
  }
  .exhibitionimg {
    min-width: 87px;
    max-width: 87px;
    min-height: 124px;
    max-height: 124px;
    background-color: lightgray;
    &:hover {
      min-width: 175px;
      max-width: 175px;
      min-height: 251px;
      max-height: 1251px;
      z-index: 2;
    }
  }
  
  .innerText {
    margin-left: 152px;
    margin-top: 26px;
    
    .titleKo {
      margin-bottom: 8px;
      font-size: 20px;
    }
    .titleEn {
      margin-bottom: 12px;
      font-size: 20px;
      font-family: 'Montserrat', sans-serif;
    }
    .location {
      color: #5A5A5A;
      font-size: 12px;
    }
  }
  `

// ---------------------------------------------------------------------------------- //  
// Main 페이지 네번째(4) 예정전시 상세 레이아웃
const FourthWrap = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 80px;
  min-height: 480px;
  max-height: 480px;
  margin-top:66px;
  
  .exhibitionimg {
    display: block;
    min-width: 340px;
    max-width: 340px;
    min-height: 480px;
    max-height: 480px;
  }

  .exhibitioninfo{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 480px;
  }
 `

// Main 페이지 네번째(4) 예정전시 className:exhibitioninfo의 상세 설정 
const FourthExhibitioninfo = styled.div`
  display: grid;
  grid-template-columns: 82px minmax(200px, 1fr) 250px;
  gap: 112px;
  height: 102px;
  border: 1px solid black;
  border-radius:8px;
  padding: 25px;

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

    // 전시회 title 
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

  &:hover {
    background-color: #232323;
    color: #E6E6E6;
  }
`

// ---------------------------------------------------------------------------------- //  
// Main 페이지 다섯번째(5) 아트그램 상세 레이아웃
const FifitWrap = styled.div`
  margin-top: 66px;
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

// Main 페이지 다섯번째(5) MainSlider 상세설정
const FifithMainSlider = styled.div`
  position: relative;
  min-height:500px;
  max-width: 364px;
  padding: 16px;
  padding-bottom: 0;
  //추후 변경 예정
  background-color: #E6E6E6;
  
  .artgramimg {
    background-color: skyblue;
    min-height: 374px;
    max-height: 374px;
    overflow: hidden;
  }
  
  .profile {
    display: flex;
    align-items: center;
    gap: 10px;
    position: absolute;
    bottom: 10px;
  }
  
  .profileimg {
    display: inline-block;
    width: 29px;
    height: 29px;
    background-color:lightgray;
    border-radius: 50px;
  }
  
  .profileNickname {
    display: flex;
    align-items: center;
    height: 29px;
    font-size: 13px;
    
    span {
      color:#8C8C8C;
    }
  }
`

// Main 페이지 다섯번째(5) SubSlider 상세설정
const FifithSubSliderLayout = styled.div`
  display: flex;
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

const Icons = styled.div`
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-${pos => pos.transform}%, -50%);
  font-size: 2.8rem;
  color: red;
  text-align: center;
`;

export {
  // Main 페이지 레이아웃
  MainLayout,
  CommenLayout,
  ThirdLayout,
  ArticleTitle,
  MainH1,
  MainH4,
  // Main 페이지(1) 상세관련
  FirstMainSliderWrap,
  FirstSubSliderWrap,
  // Main 페이지(2) 상세관련
  SecondSliderWrap,
  SecondSlider,
  // Main 페이지(3) 상세관련
  ThirdWrap,
  ThirdInner,
  // Main 페이지(4) 상세관련
  FourthWrap,
  FourthExhibitioninfo,
  // Main 페이지(5) 상세관련
  FifitWrap,
  FifithMainSlider,
  FifithSubSliderLayout,
  FifithSubSliderWrap,

  // Main Slider buttom
  Icons
};