import styled from "styled-components";

const EXTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
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
const TagText = styled.span`
  flex-grow: 3;
  padding-left: 10px;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
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
const Apply = styled.span`
  :hover {
    background: linear-gradient(180deg, #3360ff 0%, #b960ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;
const ResetImg = styled.img`
  width: 12px;
  height: 12px;
`;
const ApplyResetBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  span {
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
  }
  :hover {
    background: linear-gradient(180deg, #3360ff 0%, #b960ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;
export { EXTag, XBox, TagText, TagButton, Apply, ResetImg, ApplyResetBox };
