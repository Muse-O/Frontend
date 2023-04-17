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
      <StArtgram>아트그램</StArtgram>
      <StArtgramBox>
        <StWrap>
          <StTabWrap>
            {menuArr.map(el => (
              <StTab key={el.id} onClick={() => selectMenuHandler(el.id)}>
                {el.name}
                <StTabCount>0</StTabCount>
              </StTab>
            ))}
          </StTabWrap>

          <StImgBtnBox>
            <StLeftBtn></StLeftBtn>
            <StImgBox>
              {menuArr[currentTab].content.map(list => {
                return list.map(info => {
                  return (
                    <StImgWrap>
                      <StImg
                        key={info.artgram_id}
                        src={info.imgUrl}
                        alt={info.artgram_title}
                      />
                    </StImgWrap>
                  );
                });
              })}
            </StImgBox>
            <StRightBtn></StRightBtn>
          </StImgBtnBox>
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

const StArtgram = styled.div`
  font-family: "S-CoreDream-3Light";
  font-weight: bold;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StArtgramBox = styled.div`
  background-color: #80808029;
  width: 1010px;
  height: 404px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StImgBtnBox = styled.div`
  width: 1070px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const StLeftBtn = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: gray;
`;

const StRightBtn = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: gray;
`;

const StWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 970px; */
`;

const StTabWrap = styled.div`
  width: 450px;
  height: 63px;
  display: flex;
  align-items: center;
  margin-left: 55px;
  gap: 36px;
`;

const StTab = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 4px;
  font-family: "SpoqaHanSansNeo-Regular";
  font-weight: bold;
  font-size: 16px;
`;

const StTabCount = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: 12px;
  width: 32px;
  height: 25px;
  border-radius: 30px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StImgBox = styled.div`
  width: 958px;
  height: 261px;
  /* background-color: #80808089; */
  display: flex;
  gap: 12px;
`;

const StImgWrap = styled.div`
  background-color: #2c2c2c;
  width: 313px;
  height: 315px;
  display: flex;
  align-items: center;
`;

const StImg = styled.img`
  max-width: 313px;
  max-height: 315px;
  background: #0000007d;
`;
