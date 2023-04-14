import React from "react";
import styled from "styled-components";

function AlarmContainer() {
  return (
    <StAlramContainer>
      <AlramTitle>알림</AlramTitle>
    </StAlramContainer>
  );
}

export default AlarmContainer;

const StAlramContainer = styled.div`
  background-color: #ffff001d;
  width: 400px;
  height: 550px;
`;

const AlramTitle = styled.div`
  font-size: 20px;
`;
