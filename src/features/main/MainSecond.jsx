import React from 'react'
import * as Main from "./css/mainparts";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SecondSliderList } from './mainpageexample/SecondSliderList';
import { useCurrentExhibitonSlider } from '../../hooks/main/useCurrentExhibitonSlider';

function MainSecond() {
  const {slidersettings} = useCurrentExhibitonSlider()

  return (
    <Main.CommenLayout height="570" style={{backgroundColor:"lightsalmon"}}>
      <Main.ArticleTitle>
        <Main.MainH1 children="최신 전시" />
      </Main.ArticleTitle>
      <Main.SecondSliderWrap>
      <Slider {...slidersettings}>
        {SecondSliderList.map((el, index) => (
          <Main.SecondSlider key={index}>
          <img className="sliderImg" src={el.img} alt="01"/>
          <p className="sliderTitle">{el.title}</p>
          <p className="sliderdate">{el.date}</p>
          <p className="sliderLocation">{el.location}</p>
        </Main.SecondSlider>
        ))}
        </Slider>
      </Main.SecondSliderWrap>
    </Main.CommenLayout>
  )
}

export default MainSecond;