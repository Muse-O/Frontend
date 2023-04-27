import React from 'react'

function TopButton() {
  const topbutton = ()=> {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  })
  }

  return (
    <div onClick={topbutton} style={{fontSize:"50px"}}>탑버튼</div>
  )
}

export default TopButton;