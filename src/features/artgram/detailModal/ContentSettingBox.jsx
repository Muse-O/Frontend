import React, { useState } from "react";
import { useDeleteArtgram } from "../../../hooks/artgram/useDeleteArtgram";
import { ContentSettingBoxLayout, SettingBtn,SettingBtnborderline } from "../css/ArtgramDetailModalCss";
import * as Artgramparts from "../css/ArtgramCss";
import { Flex } from "../../../components/Flex";
import Notification from '../updateArtgram/Notification'
import { Formbtn, PreviewBoxDelete } from "../createArtgram/ArtgramFormImgparts";
import { HashTagInput, Input, TextAreaUpdate } from "../../../components/Input";
import { useFormInput } from "../../../hooks/useFormInput";
import { usePatchArtgram } from "../../../hooks/artgram/usePatchArtgram";
import cancel from '../../../assets/imgs/common/cancel.png'
import { useReport } from "../../../hooks/useReport";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { decodeEmail } from "../../login/loginTokenStore";

function ContentSettingBox({ detailData, setSettingBox }) {

  const email = useRecoilValue(decodeEmail)
  const [updateModal, setUpdateModal] = useState(false)
  const [hashtag, setHashTag] = useState(detailData.hashtag);
  const [imgState, setImgState] = useState(detailData.ArtgramImgs)
  const [formState, setFormState, handleInputChange] = useFormInput();
  const { patchArtgram } = usePatchArtgram()
  const { deleteHandle } = useDeleteArtgram();
  const { postReprt } = useReport()
  const navigate = useNavigate()
  const updateImgHandle = (imgOrder) => {
    if (imgState.length < 2) {
      alert("이미지는 최소 한 장 있어야 합니다. ")
      return
    } else {
      const selectImg = imgState.filter(el => el.imgOrder != imgOrder)
      setImgState(selectImg)
    }
  }
  const updatehandleSubmit = (e) => {
    e.preventDefault()
    if(!formState.artgramTitle && !formState.artgramDesc) {
      patchArtgram({artgramId:detailData.artgramId, payload:{artgramTitle:detailData.artgramTitle,artgramDesc:detailData.artgramDesc, artgramImgs:imgState, hashtag}})
      setFormState({})
      setUpdateModal(pre=>!pre)
      setSettingBox(pre=>!pre)
    } else if(!formState.artgramTitle && formState.artgramDesc) {
      patchArtgram({artgramId:detailData.artgramId, payload:{artgramTitle:detailData.artgramTitle,artgramDesc:formState.artgramDesc, artgramImgs:imgState, hashtag}})
      setFormState({})
      setUpdateModal(pre=>!pre)
      setSettingBox(pre=>!pre)
    } else if(formState.artgramTitle && !formState.artgramDesc) {
      patchArtgram({artgramId:detailData.artgramId, payload:{artgramTitle:formState.artgramTitle,artgramDesc:detailData.artgramDesc, artgramImgs:imgState, hashtag}})
      setFormState({})
      setUpdateModal(pre=>!pre)
      setSettingBox(pre=>!pre)
    } else {
      patchArtgram({artgramId:detailData.artgramId, payload:{...formState, artgramImgs:imgState, hashtag}})
      setFormState({})
      setUpdateModal(pre=>!pre)
      setSettingBox(pre=>!pre)
    }
  }
  const reportFn = (reportId) => {
    !email && window.confirm("회원만 가능합니다. 로그인 하시겠습니까?") && navigate('/login')
    email && postReprt({artgramId:reportId})
  }

  return (
    <ContentSettingBoxLayout>
      {email === detailData?.userEmail 
      ? (<>
          <SettingBtnborderline className="curserPoint" onClick={() => deleteHandle(detailData.artgramId)} children="삭제" />
          <SettingBtnborderline className="curserPoint" onClick={() => {
            setUpdateModal(pre=>!pre)
            }} children="수정"/> 
          <SettingBtn className="curserPoint" onClick={() => setSettingBox((pre) => !pre)} children="취소"/>        
        </>) 
      : (<>
          <SettingBtnborderline className="curserPoint" onClick={() => reportFn(detailData.artgramId)} children="신고"/>
          <SettingBtn className="curserPoint" onClick={() => setSettingBox((pre) => !pre)} children="취소"/>         
        </>)}
      <Artgramparts.UpdateModalWindow state={updateModal}>
        <Artgramparts.UpdateModalTitleLayout children={<Artgramparts.H1 children="아트그램 수정"/>}/>
        <Flex fd="column" ai="center">
          <Artgramparts.ImgZone>
            <Artgramparts.ImgZoneMsg>
              <p>아트그림에 등록된 이미지는 현재 삭제만 가능합니다.</p>
            </Artgramparts.ImgZoneMsg>
            <Artgramparts.ImgZonePreview>
              {imgState.map((img) => (
                <Artgramparts.PreviewImgBox key={img.imgOrder}>
                  <img src={img.imgUrl} alt="아트그램 수정"/>
                  <PreviewBoxDelete onClick={()=>updateImgHandle(img.imgOrder)}>삭제</PreviewBoxDelete>
                </Artgramparts.PreviewImgBox>
              ))}
            </Artgramparts.ImgZonePreview>
          </Artgramparts.ImgZone>
          <Notification/>
        </Flex>
        <Artgramparts.UpdateForm as="form"  onSubmit={updatehandleSubmit}>
        <Input 
            label="전시제목"
            inputProps={{
              type: "text", 
              name: "artgramTitle",
              value:formState.artgramTitle,
              placeholder:detailData.artgramTitle,
              maxLength:50,
              onChange: handleInputChange
            }}
            />
            <HashTagInput
            label="태그"
            hashTag={hashtag}
            setHashTag={setHashTag}
          />
          <TextAreaUpdate
              label="설명"
              inputProps={{
                type: "text", 
                name: "artgramDesc",
                placeholder:detailData.artgramDesc || "전시회에 대한 소감을 적어주세요(최대 600자)",
                value:formState.artgramDesc || detailData.artgramDesc,
                maxLength:600,
                onChange: handleInputChange
              }}
              />
          <Formbtn >아트그램 수정하기</Formbtn>       
        </Artgramparts.UpdateForm>
        <img 
          onClick={()=>{setUpdateModal(pre=>!pre); setSettingBox(pre=>!pre);}} 
          src={cancel} 
          style={{position:"absolute", display:"block", width:"1.7rem", top:"15px", right:"15px", cursor:"pointer"}}/>
      </Artgramparts.UpdateModalWindow>  
    </ContentSettingBoxLayout>
  );
}

export default ContentSettingBox;
