import React, { useState } from "react";
import styled from "styled-components";
import { useGetLikedArtgramInfo } from "../../hooks/mypage/useGetLikedArtgramInfo";

function ArtgramContainer() {
  const { LikedArtgramInfo } = useGetLikedArtgramInfo();
  // console.log(LikedArtgramInfo, "info");

  const [currentTab, clickTab] = useState(0);
  // console.log(currentTab, "ct"); //index

  const menuArr = [
    {
      id: 0,
      name: "나의 아트그램",
      content: [LikedArtgramInfo?.artgramList.result || []],
    },
    {
      id: 1,
      name: "좋아요",
      content: [LikedArtgramInfo?.artgramList.result || []],
    },
    {
      id: 2,
      name: "스크랩",
      content: [LikedArtgramInfo?.artgramList.result || []],
    },
  ];
  const selectMenuHandler = id => {
    clickTab(id);
    // console.log(menuArr[[1]].content, "currentTab");
    if (id === 1) {
      // console.log(LikedArtgramInfo?.artgramList.result, "info");
      // return LikedArtgramInfo?.artgramList.result;'
      // console.log(LikedArtgramInfo);
      return LikedArtgramInfo;
    } else if (id === 0) {
    }
  };

  // console.log(menuArr[1].content[0], "1");
  // console.log(menuArr[currentTab].content, "11");

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
              return list.map(info => {
                return (
                  <StImg
                    key={info.artgram_id}
                    src={info.imgUrl}
                    alt={info.artgram_title}
                  />
                );
              });
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
