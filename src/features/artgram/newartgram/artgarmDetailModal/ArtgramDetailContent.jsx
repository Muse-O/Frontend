import React, { useState } from 'react'
import { ContentInnerText } from '../ArtgramDetailModalCss'
import dots_gray2 from '../../../../assets/imgs/artgram/dots_gray2.png'
import { useDeleteArtgram } from '../../../../hooks/artgram/newArtgram/useDeleteArtgram'
import { usetoken } from '../../../../shared/cookies'

function ArtgramDetailContent({ detailData }) {
  const [settingBox, setSettingBox] = useState(false)
  const {deleteHandle} = useDeleteArtgram()
  const {decodetoken} = usetoken() // ToKen에서 사용자 Email 정보 가져오기 

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
    <div
      style={{position:"absolute", top:"30px", right:"30px", width:"20px", height:"20px", fontFamily: 'Montserrat'}} 
      onClick={()=>setSettingBox(pre=>!pre)}
      children={<img src={dots_gray2} width="100%" alt="설정버튼"/>}/>
    {settingBox && 
      <div
      style={{position:"absolute", top:"60px", right:"30px", width:"135px",
        display:"flex", flexDirection:"column",justifyContent:"space-between",
        borderRadius:"3px",boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
        {decodetoken.email === detailData.artgramId 
          ? <>
          <div
          style={{borderBottom:"1px solid gray", textAlign:"center",lineHeight:"32px",fontSize: "12px"}}
          onClick={()=>deleteHandle(detailData.artgramId)}
          >삭제</div>
          <div 
          style={{borderBottom:"1px solid gray", textAlign:"center", lineHeight:"32px",fontSize: "12px"}}
          onClick={()=> alert("현재 개발 중...")}
          >수정</div>
          </>
         : <>
         <div
         style={{borderBottom:"1px solid gray", textAlign:"center",lineHeight:"32px",fontSize: "12px"}}
         onClick={()=> alert("게시글 작성자만 삭제가 가능합니다.")}
         >삭제</div>
         <div 
          style={{borderBottom:"1px solid gray", textAlign:"center", lineHeight:"32px",fontSize: "12px"}}
          onClick={()=> alert("게시글 작성자만 수정이 가능합니다.")}
          >수정</div>
         </>
         }
        <div
           style={{textAlign:"center", lineHeight:"32px",fontSize: "12px"}} 
           onClick={()=>setSettingBox(pre=>!pre)}>취소</div>
      </div>}
  </ContentInnerText>
  )
}

export default ArtgramDetailContent
