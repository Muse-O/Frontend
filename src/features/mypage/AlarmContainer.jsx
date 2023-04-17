import React from "react";
import styled from "styled-components";

function AlarmContainer() {
  return (
    <StAlramContainer>
      <AlramTitle>알림</AlramTitle>
      <StAlramCount></StAlramCount>
    </StAlramContainer>
  );
}

export default AlarmContainer;

const StAlramContainer = styled.div`
  width: 393px;
  display: flex;
  gap: 7px;
`;

const AlramTitle = styled.div`
  font-family: "S-CoreDream-3Light";
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const StAlramCount = styled.div`
  background-color: gray;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;
