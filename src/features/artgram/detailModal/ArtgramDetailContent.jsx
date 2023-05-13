import React, { useState } from 'react'
// import CSS & icons & png ------------------------------------------------------------------------------/
import dots_gray2 from '../../../assets/imgs/artgram/dots_gray2.png'
import { ContentInnerText, ContentSetting } from '../css/ArtgramDetailModalCss'
// import 컴포넌트 -----------------------------------------------------------------------------------------/
import ContentSettingBox from './ContentSettingBox'

function ArtgramDetailContent({ detailData }) {
  const [settingBox, setSettingBox] = useState(false)
  return (
    <ContentInnerText>
    <div className="profileimg" children={<img src={detailData.profileImg} alt='프로필이미지'/>} />
    <div>
      <div>
        <p className="profileNickname">{detailData.nickname}</p>
        <p className="artgarmDetailTitle">{detailData.artgramTitle}</p>
        <p className="artgarmDetailDesc">{detailData.artgramDesc}</p>
        <p className="artgarmDetailHashTag">
          {detailData.hashtag.map((tag) => `#${tag}` + " ")}
        </p>
      </div>
    </div>

    <ContentSetting
      className='curserPoint'
      onClick={()=>setSettingBox(pre=>!pre)}
      children={<img src={dots_gray2} width="100%" alt="설정버튼"/>}/>
    {settingBox && 
      <ContentSettingBox detailData={detailData} setSettingBox={setSettingBox}/>
    }
  </ContentInnerText>
  )
}

export default ArtgramDetailContent
