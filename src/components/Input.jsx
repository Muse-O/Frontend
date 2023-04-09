import React from "react";
import styled from "styled-components";

export const Input = ({ label, inputProps }) => (
  <DivFlex>
    {label && <Label>{label}</Label>}
    <StyledInput {...inputProps} />
  </DivFlex>
);

const DivFlex = styled.div`
  display: flex;
  width: 100%;
`;

const StyledInput = styled.input`
  display: flex;
  flex-grow: 1;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Label = styled.label`
  display: block;
  width: 80px;
`;
