import React, { useState } from "react";
import styled from "styled-components";
import { useGetLikedArtgramInfo } from "../../hooks/mypage/useGetLikedArtgramInfo";
import { useGetMyArtgramInfo } from "../../hooks/mypage/useGetMyArtgramInfo";
import { useGetScrapArtgramInfo } from "../../hooks/mypage/useGetScrapArtgramInfo";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

/**
 * 현재 상황
 * - 좋아요 탭에서만 잘 넘어가는 상황.
 * - 스크랩은 아직 실험 불가
 * - 나의 아트그램은 페이지가 넘어가질 않음, offset 계속 0으로 넘어감
 */
function ArtgramContainer() {
  const { LikedArtgramInfo, num, setNum } = useGetLikedArtgramInfo();
  const { MyArtgramInfo } = useGetMyArtgramInfo();
  const { ScrapArtgramInfo } = useGetScrapArtgramInfo();
  // console.log(MyArtgramInfo?.paginationInfo?.hasNextPage, "info");

  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    {
      id: 0,
      name: "좋아요",
      content: [LikedArtgramInfo?.artgramList?.result || []],
      count: LikedArtgramInfo?.paginationInfo,
    },
    {
      id: 1,
      name: "스크랩",
      content: [ScrapArtgramInfo?.artgramList?.result || []],
      count: ScrapArtgramInfo?.paginationInfo,
    },
    {
      id: 2,
      name: "나의 아트그램",
      content: [MyArtgramInfo?.myArtgramList?.result || []],
      count: MyArtgramInfo?.paginationInfo,
    },
  ];
  const selectMenuHandler = id => {
    clickTab(id);
  };

  //이전 데이터 불러오기
  const getBackDataHandler = () => {
    //데이터의 첫 페이지보다 작은 페이지로 이동하지 않도록 설정
    setNum(num => Math.max(num - 3, 0));
    console.log("check Back");
  };

  //다음 데이터 불러오기
  const getNextDataHandler = () => {
    setNum(num => num + 3);
    console.log("check Next");
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
                <StTabCount>
                  {el?.count?.myArtgramCnt ? el?.count?.myArtgramCnt : 0}
                </StTabCount>
              </StTab>
            ))}
          </StTabWrap>

          <StImgBtnBox>
            <StLeftBtn disabled={num <= 0} onClick={getBackDataHandler}>
              <MdKeyboardArrowLeft size="30" color="white" />
            </StLeftBtn>
            <StImgBox>
              {menuArr[currentTab].content.map(list => {
                return list.map(info => {
                  return (
                    <StImgWrap key={info.artgram_id}>
                      <StImg src={info.imgUrl} alt={info.artgram_title} />
                    </StImgWrap>
                  );
                });
              })}
            </StImgBox>
            <StRightBtn
              // disabled={LikedArtgramInfo?.paginationInfo?.hasNextPage === false}
              onClick={getNextDataHandler}
            >
              <MdKeyboardArrowRight size="30" color="white" />
            </StRightBtn>
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

const StLeftBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StRightBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
  width: 964px;
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
  background: #2c2c2c;
`;
