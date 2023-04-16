import styled from "styled-components";

const MainSliderOutline = styled.div`
  position:relative;
  max-width: 1256px;
  width: 1256px;
  height: 704px;
  background-color: skyblue;
`

const MainSliderImg = styled.img`
  display: block;
  width: 492px;
  height: 702px;
  margin: 0 auto;
  background-color: lightcyan;
`

const MainSliderTitle = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: 56px 1fr;
  align-items: center;
  top: 134px;
  width: fit-content;
  height: 96px;

  .titleNum {
    font-size: 24px;
  }
  .title {
    font-size: 80px;
  }
`

const MainSliderDesc = styled.div`
  width: 339px;
  height: 96px;
  position: absolute;
  top: 344px;
  word-break: keep-all;
  /* text-align: justify; */
  line-height: 25px;
`

const MainSliderLink = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 314px;
  height: 70px;
  border-radius: 50px;
  background-color: #D9D9D9;
`

const MainSliderinfo = styled.div`
  position: absolute;
  top: 344px;
  transform: translateX(-300px);

  .title {
    font-size: 20px;
    margin-bottom: 4px;
  }

  .content {
    margin-bottom: 40px;
    color: #5A5A5A;
  }
`

const SubSliderOutline = styled.div`
  max-width: 269px;
  width: 269px;
  height: 704px;
  background-color: lightcoral;
`

const SubSliderImg = styled.img`
  display: block;
  width: 269px;
  height: 360px;
  margin: 0 auto;
  background-color: lightcyan;
`
const CurrentSliderIndex = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 63px;

  p {
    font-size: 25px;
    font-weight: 700;
  }
  
  span {
    font-size: 20px;
    font-weight: 400;
  }
`


export {
  // MainSlider 부분
  MainSliderOutline,
  MainSliderImg,
  MainSliderTitle,
  MainSliderDesc,
  MainSliderLink,
  MainSliderinfo,

  // SubSlider 부분
  SubSliderOutline,
  SubSliderImg,
  CurrentSliderIndex,
}