// 이미지슬라이더를 위한 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import * as Modal from "./css/ArtgramModal";
import styled from "styled-components";


function PrevArrow(props) {
  const { onClick, currentSlide } = props;

  if(currentSlide === 0 ) {
    return null
  }

  return (
    <CustomPrevButton
      onClick={onClick}>
      <Icons children={<FaChevronLeft/>}/>
    </CustomPrevButton>
  );
}


function NextArrow(props) {
  const { onClick ,currentSlide, slideCount} = props;
  // currentSlide 현재 슬라이더의 위치를 추츨해준다. 0부터 개수
  // slideCount 총 슬라이더의 개수를 파악해준다. 1부터 개수
  if(currentSlide === slideCount-1) {
    return null
  }
  return (
    <CustomNextButton
      onClick={onClick}>
      <Icons children={<FaChevronRight/>}/>
    </CustomNextButton>
  );
}
// {/* <div style={{position:"relative", right:"8px"}}>
// <FaChevronRight size={24} color="#e20303" />
// </div> */}

const settings = {
  speed: 500, // 속도조절
  infinite:false,
  slidesToShow: 1, // 화면에 보여지는 슬라이더의 수 
  slidesToScroll: 1, // 한번에 넘길 슬라이더이더의 수 
  style:{position:"relative"},
  verticalAlign: "middle", // 슬라이드를 상하 중앙으로 정렬
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
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

const CustomNextButton = styled.div`
    display: block;
    position: absolute;
    right: 5px;
    top: 50%;
    width: 50px;
    height: 50px;
    line-height: 50px;
    transform: rotateY(-50%);
    background-color:rgba(80, 80, 80, 0.2);
    border-radius: 50px;
    color: black;
    z-index: 10;
`;

const CustomPrevButton = styled(CustomNextButton)`
      left: 5px;
`

const Icons = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -41%);
  font-size: 2.8rem;
  color: red;
  text-align: center;
`;