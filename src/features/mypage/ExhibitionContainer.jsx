import React, { useState } from "react";
import styled from "styled-components";

function ExhibitionContainer() {
  const [currentTab, clickTab] = useState(0);
  // console.log(currentTab, "ct"); //index

  const menuArr = [
    {
      id: 0,
      name: "좋아요",
      content: [
        {
          id: 0,
          src: "abc",
          alt: "",
        },
        {
          id: 1,
          src: "def",
          alt: "",
        },
        {
          id: 2,
          src: "fdg",
          alt: "",
        },
      ],
    },
    {
      id: 1,
      name: "스크랩",
      content: [
        {
          id: 0,
          src: "abc",
          alt: "",
        },
      ],
    },
    {
      id: 2,
      name: "내가 여는 전시",
      content: [
        {
          id: 0,
          src: "abc",
          alt: "",
        },
        {
          id: 1,
          src: "def",
          alt: "",
        },
      ],
    },
  ];
  const selectMenuHandler = id => {
    clickTab(id);
  };

  return (
    <StContainer>
      <div style={{ fontSize: "25px", marginBottom: "10px" }}>
        전시 Exhibition
      </div>
      <StExhibitionBox>
        <StTabWrap>
          {menuArr.map(el => (
            <StTab key={el.id} onClick={() => selectMenuHandler(el.id)}>
              {el.name}
            </StTab>
          ))}
        </StTabWrap>
        {menuArr[currentTab].content.map(list => {
          return (
            <img
              style={{ width: "30px", height: "30px", background: "blue" }}
              key={list.id}
              src={list.src}
              alt={list.alt}
            />
          );
        })}
        {/* <div></div> */}
        {/* <StImgBox>
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
