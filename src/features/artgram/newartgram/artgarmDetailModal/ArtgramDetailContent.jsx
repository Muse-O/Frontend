import React from 'react'
import { ContentInnerText } from '../ArtgramDetailModalCss'

function ArtgramDetailContent({ detailData }) {
  return (
    <ContentInnerText>
    <div className="profileimg" />
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
  </ContentInnerText>
  )
}

export default ArtgramDetailContent
