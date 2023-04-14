import React, { useState } from "react";
import styled from "styled-components";

function ArtgramContainer() {
  const [currentTab, clickTab] = useState(0);
  // console.log(currentTab, "ct"); //index

  const menuArr = [
    {
      id: 0,
      name: "나의 아트그램",
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
        // {
        //   id: 3,
        //   src: "fdg",
        //   alt: "",
        // },
      ],
    },
    {
      id: 1,
      name: "좋아요",
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
      name: "스크랩",
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
      <div style={{ fontSize: "25px", marginBottom: "15px" }}>아트그램</div>
      <StArtgramBox>
        <StWrap>
          <StTabWrap>
            {menuArr.map(el => (
              <StTab key={el.id} onClick={() => selectMenuHandler(el.id)}>
                {el.name}
              </StTab>
            ))}
          </StTabWrap>
          <StImgWrap>
            {menuArr[currentTab].content.map(list => {
              return <StImg key={list.id} src={list.src} alt={list.alt} />;
            })}
          </StImgWrap>
        </StWrap>
      </StArtgramBox>
    </StContainer>
  );
}

export default ArtgramContainer;

const StContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;
const StArtgramBox = styled.div`
  background-color: #ffc0cb50;
  width: 1050px;
  height: 410px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 970px;
`;

const StTabWrap = styled.div`
  display: flex;
  gap: 30px;
`;
const StTab = styled.div`
  padding: 18px 0px;
  cursor: pointer;
  font-size: 15px;
`;

const StImgWrap = styled.div`
  width: 970px;
  height: 340px;
  background-color: #80808058;
  display: flex;
  gap: 30px;
`;
const StImg = styled.img`
  width: 300px;
  height: 340px;
  background: #0000007d;
`;
