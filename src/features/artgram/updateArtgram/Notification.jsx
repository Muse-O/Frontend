import React from 'react'
import * as Artgramparts from "../css/ArtgramCss";
import exclamationMark from '../../../assets/imgs/artgram/exclamationMark.png'

function Notification() {
  return (
    <Artgramparts.Notification>
    <p>
      <span
        children={
          <>
            <img src={exclamationMark} alt='경고이미지'/> 필수입력
          </>
        }
      />
    </p>
    <p children="사진은 기존 사진을 삭제하는 것만 가능하며, 추가기능은 추후에 제공해 드릴 예정입니다. 또한 이미지는 최소 1장이 있어야 합니다." />
  </Artgramparts.Notification>
  )
}

export default Notification