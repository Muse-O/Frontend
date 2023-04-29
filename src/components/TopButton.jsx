import React from 'react'
import topbtn from '../assets/imgs/common/topbtn.png'
import { TopButtun, TopButtunWrap } from '../shared/GlobalStyled'

function TopButton() {
  const topbutton = ()=> {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  })
  }

  return (
    <TopButtunWrap children={<TopButtun onClick={topbutton} children={<img src={topbtn}/>}/>}/>
    
  )
}

export default TopButton;