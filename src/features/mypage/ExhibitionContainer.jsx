import React, { useState } from "react";
import styled from "styled-components";

function ExhibitionContainer() {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: "좋아요", content: "좋아요 누른 전시 게시물 이미지" },
    { name: "스크랩", content: "스크랩한 전시 게시물 이미지" },
    { name: "내가 여는 전시", content: "내가 여는 전시 게시물 이미지" },
  ];
  const selectMenuHandler = index => {
    clickTab(index);
  };

  return (
    <StContainer>
      <div style={{ fontSize: "25px", marginBottom: "10px" }}>
        전시 Exhibition
      </div>
      <StExhibitionBox>
        <StTabWrap>
          {menuArr.map((el, index) => (
            <StTab
              key={index}
              className={index === currentTab ? "submenu focused" : "submenu"}
              onClick={() => selectMenuHandler(index)}
            >
              {el.name}
            </StTab>
          ))}
        </StTabWrap>
        <div>{menuArr[currentTab].content}</div>
        {/* <StTagBox>
          <div>좋아요</div>
          <div>스크랩</div>
          <div>내가 여는 전시</div>
        </StTagBox>
        <StImgBox>
          <StImg>이미지</StImg>
          <StImg>이미지</StImg>
          <StImg>이미지</StImg>
          <StImg>이미지</StImg>
          <StImg>이미지</StImg>
        </StImgBox> */}
      </StExhibitionBox>
    </StContainer>
  );
}

export default ExhibitionContainer;

const StContainer = styled.div`
  margin-top: 50px;
`;
const StExhibitionBox = styled.div`
  background-color: pink;
  width: 1050px;
  height: 300px;
  display: flex;
  flex-direction: column;
`;

const StTabWrap = styled.div`
  display: flex;
  gap: 30px;
`;
const StTab = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 15px;
`;

//------------------------------
const StTagBox = styled.div`
  margin-top: 20px;
  margin-left: 40px;

  width: 100%;
  height: 30px;
  display: flex;
  gap: 10px;

  div {
    height: 20px;
    border: 1px solid black;
  }
`;

const StImgBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const StImg = styled.div`
  width: 160px;
  height: 220px;
  background-color: #0000007b;
`;
