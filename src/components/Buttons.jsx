import React from "react";
import styled from "styled-components";

/*----------------------------------------*
 * 공통 버튼
 -----------------------------------------*/
const BaseBtn = ({ children, onClick }) => {
  return <StyledBaseButton onClick={onClick}>{children}</StyledBaseButton>;
};
/*----------------------------------------*
 * UnsetButton
 -----------------------------------------*/
 export const UnsetBtn = ({ children, onClick }) => {
  return <StyledUnset onClick={onClick}>{children}</StyledUnset>;
};

const StyledBaseButton = styled.button`
  cursor: pointer;
`;

const StyledUnset = styled(StyledBaseButton)`
  border: none;
  background-color: transparent;
`;
