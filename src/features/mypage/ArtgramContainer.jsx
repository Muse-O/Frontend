import React, { useState } from "react";
import styled from "styled-components";
import { useGetLikedArtgramInfo } from "../../hooks/mypage/useGetLikedArtgramInfo";
import { useGetMyArtgramInfo } from "../../hooks/mypage/useGetMyArtgramInfo";
import { useGetScrapArtgramInfo } from "../../hooks/mypage/useGetScrapArtgramInfo";

function ArtgramContainer() {
  const { LikedArtgramInfo } = useGetLikedArtgramInfo();
  const { MyArtgramInfo } = useGetMyArtgramInfo();
  const { ScrapArtgramInfo } = useGetScrapArtgramInfo();
  // console.log(ScrapArtgramInfo, "info");

  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    {
      id: 0,
      name: "좋아요",
      content: [LikedArtgramInfo?.artgramList?.result || []],
    },
    {
      id: 1,
      name: "스크랩",
      content: [ScrapArtgramInfo?.artgramList?.result || []],
    },
    {
      id: 2,
      name: "나의 아트그램",
      content: [MyArtgramInfo?.myArtgramList?.result || []],
    },
  ];
  const selectMenuHandler = id => {
    clickTab(id);
  };

  return (
    <StContainer>
      <div style={{ fontSize: "25px", marginBottom: "20px" }}>아트그램</div>
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
  margin-top: 25px;
  display: flex;
  flex-direction: column;
`;
const StArtgramBox = styled.div`
  background-color: #80808029;

  width: 1010px;
  height: 404px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 970px; */
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
  gap: 10px;
`;
const StImg = styled.img`
  width: 313px;
  height: 315px;
  background: #0000007d;
`;
