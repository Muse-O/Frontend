import { styled } from "@tanstack/react-query-devtools/build/lib/utils";
import React from "react";

export default function EXApplyBox() {
  return (
    <ApplyContainer>
      <ApplyResetBox>초기화</ApplyResetBox>
      <ApllyBox>
        <span>취소</span>
        <span>적용하기</span>
      </ApllyBox>
    </ApplyContainer>
  );
}

const ApplyResetBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 36px;
`;
const ApllyBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 7px;
`;
const ApplyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 24px 20px 24px;
  border-top: 1px solid #eeeeee;
`;
