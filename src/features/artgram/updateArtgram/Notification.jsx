import React from 'react'
import { RiErrorWarningLine } from "react-icons/ri";
import * as Artgramparts from "../css/ArtgramCss";

function Notification() {
  return (
    <Artgramparts.Notification>
    <p>
      <span
        children={
          <>
            <RiErrorWarningLine /> 필수입력
          </>
        }
      />
    </p>
    <p children="사진은 기존 사진을 삭제하는 것만 가능합니다. 추가기능은 추후에 제공해 드릴 예정입니다." />
    <p children="전시 제목과 설명은 필수 입력사항입니다." />
  </Artgramparts.Notification>
  )
}

export default Notification