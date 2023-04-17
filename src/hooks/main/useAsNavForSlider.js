import { useEffect, useRef, useState } from "react";
import { Icons } from "../../features/main/css/mainparts";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

export const useAsNavForSlider = () => {
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
    // autoplay: true,
    // autoplaySpeed: 2000,
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
    // autoplay: true,
    // autoplaySpeed: 2000,
    infinite: true,
    dots: false,
    arrows: true,
    prevArrow: <PrevArrow/>,
    nextArrow: <NextArrow/>,
    beforeChange:Indexhandler
  };
  return {firstSliderSettings, secondSliderSettings, currentSlideIndex}
}

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
      right:"0",
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