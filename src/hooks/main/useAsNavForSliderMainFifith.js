import { useEffect, useRef, useState } from "react";
import next_cut_gray from '../../assets/imgs/common/next_cut_gray.png'
import styled from "styled-components";

export const useAsNavForSliderMainFifith = () => {
  const [mainSlider, setMainSlider] = useState(null);
  const [subSlider, setSudSilder] = useState(null);
  const mainSliderRef = useRef(null);
  const subSliderRef = useRef(null);

  useEffect(() => {
    // 서버 연결 후, 연동이 사라지는 문제에 있어서, setInterval 매서드를 통해서 에러를 제어
    setInterval(()=> {
      setMainSlider(mainSliderRef.current);
      setSudSilder(subSliderRef.current);
     }, 3000)
  }, []);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);
  const Indexhandler = (oldIndex, newIndex) => {
    setCurrentSlideIndex(newIndex + 1);
  };

  const mainSliderSettings = {
    asNavFor: subSlider,
    ref: (slider) => (mainSliderRef.current = slider),
    slidesToShow: 1,
    swipeToSlide: true,
    infinite: true,
    dots: false,
    arrows: false,
  };
  const subSliderSettings = {
    asNavFor: mainSlider,
    ref: (slider) => (subSliderRef.current = slider),
    slidesToShow: 4,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    dots: false,
    arrows: false,
    // prevArrow: <PrevArrow />,
    // nextArrow: <NextArrow />,
    style: { position: "static"},
    beforeChange: Indexhandler,
  };
  return { mainSliderSettings, subSliderSettings, currentSlideIndex };
};

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <PrevArrowST
      onClick={onClick}
      children={<img src={next_cut_gray}/>}/>
  );
}

function NextArrow(props) {
  const { onClick } = props;
  return (
    <NextArrowST
    onClick={onClick}
    children={<img src={next_cut_gray}/>}/>
  );
}


const PrevArrowST = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  right:64px;
  min-width: 63px;
  min-height: 63px;
  background-color: lightgray;
  border-radius: 50px;
  z-index:1;
  cursor: pointer;

  img {
    display: block;
    transform: rotate(-180deg);
    width: 10px;
  }

  @media (max-width: 1440px) {
    bottom: 0;
    right:48px;
    min-width: 47.25px;
    min-height: 47.25px;
    img {
      width: 7.5px;
    }
  }
`

const NextArrowST = styled(PrevArrowST)`
  bottom: 0;
  left: 232px;
  img {
    transform: rotate(0deg);
  }
`