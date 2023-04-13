import React, { useState } from "react";
import styled from "styled-components";
import { Flex } from "./Flex";
import { useHashTagInput } from "../hooks/artgram/useHashTagInput";

export const Input = ({ label, inputProps }) => (
  <DivFlex>
    {label && <Label>{label}</Label>}
    <StyledInput {...inputProps}/>
  </DivFlex>
);

export const HashTagInput = ({ label, hashTag, setHashTag }) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  // console.log(inputValue);
  const {handleInputKeyDown, handleRemoveHashTag} = useHashTagInput(inputValue, setInputValue, hashTag, setHashTag)
  return (
    <Flex fd="column" gap="10">
      <DivFlex>
        {label && <Label>{label}</Label>}
        <HashTagInputs
          type="text"
          value={inputValue}
          placeholder="Add a hashtag"
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
      </DivFlex>
      <HashTagList>
        {hashTag.map((hashTag) => (
          <HashTagItem key={hashTag}>
            <HashTagText>#{hashTag}</HashTagText>{" "}
            {/* 아하 여기서 #을 붙여주는구나 */}
            <HashTagButton onClick={() => handleRemoveHashTag(hashTag)}>
              x
            </HashTagButton>
          </HashTagItem>
        ))}
      </HashTagList>
    </Flex>
  );
}

const DivFlex = styled.div`
  display: flex;
  width: 100%;
`;

const StyledInput = styled.input`
  display: flex;
  flex-grow: 1;
  padding: 0 10px;
  border-radius: 5px;
  font-size: 16px;
  /* border: ${props => !props.value ? "1px solid red" : "1px solid #ccc;"}; */
  border: 1px solid #ccc;
`;

const HashTagInputs = styled(StyledInput)`
  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const Label = styled.label`
  display: block;
  width: 120px;
`;

const HashTagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const HashTagItem = styled.li`
  display: flex;
  align-items: center;
  margin: 2px;
  padding: 4px 8px;
  background-color: #efefef;
  border-radius: 16px;
`;

const HashTagText = styled.span`
  margin-right: 4px;
  font-weight: bold;
`;

const HashTagButton = styled.button`
  position: relative;
  margin-left: 8px;
  bottom: 3px;
  border: none;
  background-color:transparent;
  border-radius: 50px;
  color: #ff5100;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;