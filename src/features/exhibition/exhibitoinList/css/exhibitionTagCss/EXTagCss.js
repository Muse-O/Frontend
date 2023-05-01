import styled from "styled-components";

const EXTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const XBox = styled.div`
  margin-right: 2px;
  flex-grow: 1;
  width: 10px;
  height: 10px;
  color: #fff;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  font-size: 18px;
`;
const TagText = styled.div`
  flex-grow: 3;
  padding-left: 10px;
  color: #fff;
`;
const TagButton = styled.div`
  display: flex;
  margin: 2px;
  padding: 0px 10px;
  align-items: center;
  background: #242424;
  border-radius: 50px;
  min-width: 85px;
  height: 33px;
  gap: 8px;
`;
export { EXTag, XBox, TagText, TagButton };
