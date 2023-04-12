// 이미지슬라이더를 위한 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import * as Modal from "./ArtgramModal";
import styled from "styled-components";


function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <CustomPrevButton
      onClick={onClick}>
      <Icons children={<FaChevronLeft/>}/>
    </CustomPrevButton>
  );
}


function SampleNextArrow(props) {
  const { onClick } = props;
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