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

export const RegisterBtn = ({ children, onClick }) => {
  return <StyledRegisterBtn onClick={onClick}>{children}</StyledRegisterBtn>;
};

const StyledBaseButton = styled.button`
  cursor: pointer;
`;

const StyledUnset = styled(StyledBaseButton)`
  border: none;
  background-color: transparent;
`;

const StyledRegisterBtn = styled(StyledUnset)`
  width: 100px;
  margin: 0 auto;
`;
