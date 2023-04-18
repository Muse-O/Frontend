import React, { useState } from "react";
import styled from "styled-components";
import { useGetLikedExhibitionInfo } from "../../hooks/mypage/useGetLikedExhibitionInfo";
import { useGetMyExhibitionInfo } from "../../hooks/mypage/useGetMyExhibitionInfo";
import { useGetScrapExhibitionInfo } from "../../hooks/mypage/useGetScrapExhibitionInfo";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function ExhibitionContainer() {
  const { LikedExhibitionInfo } = useGetLikedExhibitionInfo();
  const { MyExhibitionInfo } = useGetMyExhibitionInfo();
  const { ScrapExhibitionInfo } = useGetScrapExhibitionInfo();

  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    {
      id: 0,
      name: "좋아요",
      content: [LikedExhibitionInfo?.exhibitionList?.result || []],
      count: LikedExhibitionInfo?.paginationInfo,
    },
    {
      id: 1,
      name: "스크랩",
      content: [ScrapExhibitionInfo?.exhibitionList?.result || []],
      count: ScrapExhibitionInfo?.paginationInfo,
    },
    {
      id: 2,
      name: "내가 여는 전시",
      content: [MyExhibitionInfo?.myExhibitionList?.result || []],
      count: MyExhibitionInfo?.paginationInfo,
    },
  ];
  const selectMenuHandler = id => {
    clickTab(id);
  };

  return (
    <StContainer>
      <StExhibition>전시</StExhibition>
      <StExhibitionBox>
        <StWrap>
          <StTabWrap>
            {menuArr.map(el => (
              <StTab key={el.id} onClick={() => selectMenuHandler(el.id)}>
                {el.name}
                <StTabCount>
                  {el?.count?.myExhibitionCnt ? el?.count?.myExhibitionCnt : 0}
                </StTabCount>
              </StTab>
            ))}
          </StTabWrap>

          <StImgBtnBox>
            <StLeftBtn>
              <MdKeyboardArrowLeft size="30" color="white" />
            </StLeftBtn>
            <StImgBox>
              {menuArr[currentTab].content.map(list => {
                return list.map(info => {
                  return (
                    <StImgWrap key={info.exhibition_id}>
                      <StImg
                        src={info.post_image}
                        alt={info.exhibition_title}
                      />
                    </StImgWrap>
                  );
                });
              })}
            </StImgBox>
            <StRightBtn>
              <MdKeyboardArrowRight size="30" color="white" />
            </StRightBtn>
          </StImgBtnBox>
        </StWrap>
      </StExhibitionBox>
    </StContainer>
  );
}

export default ExhibitionContainer;

const StContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

const StExhibition = styled.div`
  font-family: "S-CoreDream-3Light";
  font-weight: bold;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StRightBtn = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StExhibitionBox = styled.div`
  background-color: #80808029;
  width: 1010px;
  height: 348px;
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
  width: 182px;
  height: 261px;
  display: flex;
  align-items: center;
`;
const StImg = styled.img`
  max-width: 182px;
  max-height: 261px;
`;
