import * as Main from "../../features/main/css/mainparts";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

export const useCurrentExhibitonSlider = () => {
  const slidersettings = {
    slidesToShow: 2, 
    swipeToSlide: true,
    focusOnSelect: true,
    autoplay: true, 
    autoplaySpeed: 2000,
    infinite: true,
    dots: false,
    arrows: true,
    prevArrow: <PrevArrow/>,
    nextArrow: <NextArrow/>,
    style:{position:"static"}, 
  };
  return {slidersettings}
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      style={{
        position: "absolute",
        top: "22px",
        right:"64px",
        minWidth: "40px",
        minHeight: "40px",
        backgroundColor: "lightgray",
        borderRadius: "50px",
        zIndex:"1"
      }}
      onClick={onClick}>
      <Main.Icons transform="58" children={<FaChevronLeft/>}/>
    </div>
  );
}

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
    style={{
      position: "absolute",
      top: "22px",
      right:"0",
      minWidth: "40px",
      minHeight: "40px",
      backgroundColor: "lightgray",
      borderRadius: "50px",
      zIndex:"1"
    }}
    onClick={onClick}>
    <Main.Icons transform="43" children={<FaChevronRight/>}/>
  </div>
  );
}