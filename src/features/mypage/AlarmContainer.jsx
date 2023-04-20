import React from "react";
import styled from "styled-components";
import bell from "../../assets/imgs/mypage/bell_gray.png";

function AlarmContainer() {
  return (
    <StAlramContainer>
      <AlramTitle>알림</AlramTitle>
      <StBell>
        <img src={bell} alt="bell" />
      </StBell>
    </StAlramContainer>
  );
}

export default AlarmContainer;

const StAlramContainer = styled.div`
  width: 393px;
  display: flex;
  gap: 4px;
`;

const AlramTitle = styled.div`
  font-family: "S-CoreDream-3Light";
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const StBell = styled.div`
  width: 23px;
  height: 23px;

  img {
    width: 23px;
    height: 23px;
  }
`;
