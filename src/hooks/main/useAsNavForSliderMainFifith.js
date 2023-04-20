import { useEffect, useRef, useState } from "react";
import { Icons } from "../../features/main/css/mainparts";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

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
     }, 2000)
  }, []);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);
  const Indexhandler = (oldIndex, newIndex) => {
    setCurrentSlideIndex(newIndex + 1);
  };

  const firstSliderSettings = {
    asNavFor: subSlider,
    ref: (slider) => (mainSliderRef.current = slider),
    slidesToShow: 1,
    swipeToSlide: true,
    infinite: true,
    dots: false,
    arrows: false,
    style: { maxWidth: "387px" },
  };
  const secondSliderSettings = {
    asNavFor: mainSlider,
    ref: (slider) => (subSliderRef.current = slider),
    slidesToShow: 4,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    dots: false,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    style: { position: "static", maxWidth: "1097px", minWidth: "1097px" },
    beforeChange: Indexhandler,
  };
  return { firstSliderSettings, secondSliderSettings, currentSlideIndex };
};

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      style={{
        position: "absolute",
        bottom: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "63px",
        height: "63px",
        backgroundColor: "lightgray",
        borderRadius: "50px",
        zIndex: "1",
      }}
      onClick={onClick}
    >
      <Icons transform="58" children={<FaChevronLeft />} />
    </div>
  );
}

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      style={{
        position: "absolute",
        bottom: "0",
        left: "232px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "63px",
        height: "63px",
        backgroundColor: "lightgray",
        borderRadius: "50px",
        zIndex: "1",
      }}
      onClick={onClick}
    >
      <Icons transform="43" children={<FaChevronRight />} />
    </div>
  );
}
