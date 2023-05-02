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

//전시회 제출 버튼
export const SubmitBtn = ({ children, onClick }) => {
  return <StyledSubmitBtn onClick={onClick}>{children}</StyledSubmitBtn>;
};

const StyledBaseButton = styled.button`
  cursor: pointer;
`;

const StyledUnset = styled(StyledBaseButton)`
  border: none;
  background-color: transparent;
`;

const StyledSubmitBtn = styled(StyledUnset)`
  background-color: #ffffff;
  border: 1px solid #171717;
  font-size: 17px;
  width: 100%;
  border-radius: 50px;
  height: 70px;
  :hover {
    background: #242424;
    color: #ffffff;
  }
`;
