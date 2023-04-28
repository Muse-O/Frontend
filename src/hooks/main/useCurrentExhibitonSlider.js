import styled from "styled-components";
import * as Main from "../../features/main/css/mainparts";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import next_cut_gray from '../../assets/imgs/common/next_cut_gray.png'

export const useCurrentExhibitonSlider = () => {
  const slidersettings = {
    slidesToShow: 6, 
    swipeToSlide: true,
    focusOnSelect: true,
    autoplay: true, 
    autoplaySpeed: 5000,
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
  top: 8px;
  right:64px;
  min-width: 40px;
  min-height: 40px;
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
    top: 6px;
    right:48px;
    min-width: 30px;
    min-height: 30px;
    img {
      width: 7.5px;
    }
  }
`

const NextArrowST = styled(PrevArrowST)`
  right:0;
  img {
    transform: rotate(0deg);
  }
`