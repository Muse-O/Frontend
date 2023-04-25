import styled from "styled-components";

const PostWrap = styled.div`
  position: relative;
  flex-direction: column;
  display: flex;
  flex: 1;
  max-width: 515px;
  max-height: 1080px;
  margin-left: 75px;
`;
const Post = styled.div`
  position: fixed;
`;
const PageTitle = styled.h1`
  margin-top: 40px;
  font-family: "S-Core Dream";
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 57px;
`;
const SelectOnOff = styled.div`
  margin-top: 30px;
`;
const commonStyle = `
  font-family: "S-Core Dream";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;
  background-color: transparent;
  :hover {
    color: #242424;
  }
  color: #7e7e7e;
`;

const Offline = styled.button`
  ${commonStyle}
  margin-right: 60px;
  color: ${(props) =>
    props.exhibitionKind === "EK0001" ? "#242424" : "#7e7e7e"};
`;

const OnLine = styled.button`
  ${commonStyle}
  cursor: pointer;
  color: ${(props) =>
    props.exhibitionKind === "EK0002" ? "#242424" : "#7e7e7e"};
`;

const PostImgArea = styled.div`
  display: flex;
  background-color: #d9d9d9;
  height: 520px;
  width: 364px;
  margin-top: 40px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const DragIcon = styled.img`
  width: 3em;
  height: 3em;
`;
const Postimg = styled.img`
  display: block;
  width: 365px;
  max-height: 520px;
  margin-top: 40px;
`;

const UpDateButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const SubmitButton = styled.button`
  background-color: #d9d9d9;
  width: 364px;
  height: 40px;
  border-radius: 50px;
  margin-top: 15px;
`;

const Caution = styled.div`
  width: 364px;
  height: 100px;
  background-color: #d9d9d9;
  margin-top: 20px;
`;

export {
  Postimg,
  DragIcon,
  SelectOnOff,
  PostWrap,
  PageTitle,
  Offline,
  OnLine,
  UpDateButtons,
  Post,
  Caution,
  SubmitButton,
  PostImgArea,
};
