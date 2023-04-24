import React from "react";
import { usetoken } from "../../../shared/cookies";
import { useDeleteArtgram } from "../../../hooks/artgram/newArtgram/useDeleteArtgram";
import { ContentSettingBoxLayout, SettingBtn,SettingBtnborderline } from "../css/ArtgramDetailModalCss";

function ContentSettingBox({ detailData, setSettingBox }) {
  const { decodetoken } = usetoken(); // ToKen에서 사용자 Email 정보 가져오기
  const { deleteHandle } = useDeleteArtgram();
  return (
    <ContentSettingBoxLayout>
      {decodetoken.email === detailData.artgramId 
      ? (<>
          <SettingBtnborderline onClick={() => deleteHandle(detailData.artgramId)} children="삭제" />
          <SettingBtnborderline onClick={() => alert("현재 개발 중...")} children="수정"/> 
          <SettingBtn onClick={() => setSettingBox((pre) => !pre)} children="취소"/>        
        </>) 
      : (<>
          <SettingBtnborderline onClick={() => alert("게시글 작성자만 삭제가 가능합니다.")} children="삭제" />
          <SettingBtnborderline onClick={() => alert("게시글 작성자만 수정이 가능합니다.")} children="수정"/>
          <SettingBtn onClick={() => setSettingBox((pre) => !pre)} children="취소"/>         
        </>)}
    </ContentSettingBoxLayout>
  );
}

export default ContentSettingBox;
