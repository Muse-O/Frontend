import React, { useState } from "react";
import styled from "styled-components";
import { useGetLikedExhibitionInfo } from "../../hooks/mypage/useGetLikedExhibitionInfo";
import { useGetMyExhibitionInfo } from "../../hooks/mypage/useGetMyExhibitionInfo";
import { useGetScrapExhibitionInfo } from "../../hooks/mypage/useGetScrapExhibitionInfo";

function ExhibitionContainer() {
  const { LikedExhibitionInfo } = useGetLikedExhibitionInfo();
  const { MyExhibitionInfo } = useGetMyExhibitionInfo();
  const { ScrapExhibitionInfo } = useGetScrapExhibitionInfo();
  // console.log(ScrapExhibitionInfo);

  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    {
      id: 0,
      name: "좋아요",
      content: [LikedExhibitionInfo?.exhibitionList?.result || []],
    },
    {
      id: 1,
      name: "스크랩",
      content: [ScrapExhibitionInfo?.exhibitionList?.result || []],
    },
    {
      id: 2,
      name: "내가 여는 전시",
      content: [MyExhibitionInfo?.myExhibitionList?.result || []],
    },
  ];
  const selectMenuHandler = id => {
    clickTab(id);
  };

  return (
    <StContainer>
      <div style={{ fontSize: "25px", marginBottom: "15px" }}>전시</div>
      <StExhibitionBox>
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
                    key={info.exhibition_id}
                    src={info.post_image}
                    alt={info.exhibition_title}
                  />
                );
              });
            })}
          </StImgWrap>
        </StWrap>
      </StExhibitionBox>
    </StContainer>
  );
}

export default ExhibitionContainer;

const StContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
`;
const StExhibitionBox = styled.div`
  background-color: #ffc0cb61;
  width: 1050px;
  height: 300px;
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
  height: 230px;
  background-color: #80808089;
  display: flex;
  gap: 30px;
`;

const StImg = styled.img`
  width: 170px;
  height: 230px;
  background: #0000007d;
`;
