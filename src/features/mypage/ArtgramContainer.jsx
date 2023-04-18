import React, { useState } from "react";
import styled from "styled-components";
import { useGetLikedArtgramInfo } from "../../hooks/mypage/useGetLikedArtgramInfo";
import { useGetMyArtgramInfo } from "../../hooks/mypage/useGetMyArtgramInfo";
import { useGetScrapArtgramInfo } from "../../hooks/mypage/useGetScrapArtgramInfo";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function ArtgramContainer() {
  const { LikedArtgramInfo, likedNum, setLikedNum } = useGetLikedArtgramInfo();
  const { MyArtgramInfo, myArtgramNum, setMyArtgramNum } =
    useGetMyArtgramInfo();
  const { ScrapArtgramInfo, scrapArtgramNum, setScrapArtgramNum } =
    useGetScrapArtgramInfo();
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

  /**
   * 클릭한 버튼의 탭 메뉴 아이디가 0이면 좋아요, 1이면 스크랩, 3이면 내글.
   */
  //이전 데이터 불러오기
  const getBackDataHandler = () => {
    //데이터의 첫 페이지보다 작은 페이지로 이동하지 않도록 설정
    if (menuArr[currentTab].id === 0) {
      setLikedNum(likedNum => Math.max(likedNum - 3, 0));
    } else if (menuArr[currentTab].id === 1) {
      setScrapArtgramNum(scrapArtgramNum => Math.max(scrapArtgramNum - 3, 0));
    } else if (menuArr[currentTab].id === 2) {
      setMyArtgramNum(myArtgramNum => Math.max(myArtgramNum - 3, 0));
    }
    // console.log("check Back");
  };

  //다음 데이터 불러오기
  const getNextDataHandler = () => {
    if (menuArr[currentTab].id === 0) {
      setLikedNum(likedNum => likedNum + 3);
    } else if (menuArr[currentTab].id === 1) {
      setScrapArtgramNum(scrapArtgramNum => scrapArtgramNum + 3);
    } else if (menuArr[currentTab].id === 2) {
      setMyArtgramNum(myArtgramNum => myArtgramNum + 3);
    }
    // console.log("check Next");
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
            <StLeftBtn onClick={getBackDataHandler}>
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
            <StRightBtn onClick={getNextDataHandler}>
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
