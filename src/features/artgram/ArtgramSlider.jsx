// 이미지슬라이더를 위한 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight } from 'react-icons/fa';
import * as Modal from "./ArtgramModal";


function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block flex",
        background: "#fffffff6",
        position: "absolute",
        right: "10px",
        width: "50px",
        height: "50px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50px",
        color: "black",
      }}
      onClick={onClick}
    >
      <div style={{position:"relative", right:"8px"}}>
        <FaChevronRight size={24} color="#e20303" />
      </div>
    </div>
  );
}

const settings = {
  speed: 500, // 속도조절
  // infinite:false,
  slidesToShow: 1, // 화면에 보여지는 슬라이더의 수 
  slidesToScroll: 1, // 한번에 넘길 슬라이더이더의 수 
  style:{width:"100%", position:"relative"},
  prevArrow: <SamplePrevArrow />,
  nextArrow: <SampleNextArrow />,
};

const ArtgramSlider = ({map}) => {
  return (
    <Slider {...settings}>
      {map.map((img) => (
        <Modal.ModdalinnerImg key={img.imgUrl} src={img.imgUrl} width="100" />
      ))}
    </Slider>
  );
}

export default ArtgramSlider;