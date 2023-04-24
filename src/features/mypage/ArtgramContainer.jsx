import React, { useState } from "react";
import styled from "styled-components";
import { useGetLikedArtgramInfo } from "../../hooks/mypage/useGetLikedArtgramInfo";
import { useGetMyArtgramInfo } from "../../hooks/mypage/useGetMyArtgramInfo";
import { useGetScrapArtgramInfo } from "../../hooks/mypage/useGetScrapArtgramInfo";
import { useOpenModal } from "./../../hooks/artgram/useOpenModal";
import leftBtn from "../../assets/imgs/common/next_cut_gray2.png";
import rightBtn from "../../assets/imgs/common/next_cut_gray2.png";
import ArtgarmDetailModal from "../artgram/newartgram/ArtgarmDetailModal";

function ArtgramContainer() {
  const { modalState, openModalhandle } = useOpenModal(); //아트그램 모달
  const [artgramId, setArtgramId] = useState(""); //id를 넘겨주기 위한 state=

  const { LikedArtgramInfo, likedNum, setLikedNum } = useGetLikedArtgramInfo();
  const { MyArtgramInfo, myArtgramNum, setMyArtgramNum } =
    useGetMyArtgramInfo();
  const { ScrapArtgramInfo, scrapArtgramNum, setScrapArtgramNum } =
    useGetScrapArtgramInfo();

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
    if (menuArr[currentTab].id === 0) {
      setLikedNum(likedNum => Math.max(likedNum - 3, 0));
    } else if (menuArr[currentTab].id === 1) {
      setScrapArtgramNum(scrapArtgramNum => Math.max(scrapArtgramNum - 3, 0));
    } else if (menuArr[currentTab].id === 2) {
      setMyArtgramNum(myArtgramNum => Math.max(myArtgramNum - 3, 0));
    }
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
  };

  const detailArtgramModal = info => {
    const artgramId = info?.artgram_id;
    setArtgramId(artgramId); //id 넘겨주기
    openModalhandle(artgramId);
  };

  return (
    <>
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
                <img src={leftBtn} alt="leftBtn" />
              </StLeftBtn>
              <StImgBox>
                {menuArr[currentTab].content.map(list => {
                  return list.map(info => {
                    return (
                      <StImgWrap
                        key={info.artgram_id}
                        onClick={() => detailArtgramModal(info)}
                      >
                        <StImg src={info.imgUrl} alt={info.artgram_title} />
                      </StImgWrap>
                    );
                  });
                })}
              </StImgBox>
              <StRightBtn
                disabled={
                  (menuArr[currentTab].id === 0 &&
                    !LikedArtgramInfo?.paginationInfo?.hasNextPage) ||
                  (menuArr[currentTab].id === 1 &&
                    !ScrapArtgramInfo?.paginationInfo?.hasNextPage) ||
                  (menuArr[currentTab].id === 2 &&
                    !MyArtgramInfo?.paginationInfo?.hasNextPage)
                }
                onClick={getNextDataHandler}
              >
                <img src={rightBtn} alt="leftBtn" />
              </StRightBtn>
            </StImgBtnBox>
          </StWrap>
        </StArtgramBox>
      </StContainer>

      {/* 아트그램 모달 */}
      {modalState && (
        <ArtgarmDetailModal
          artgramId={artgramId}
          modalState={modalState}
          openModalhandle={openModalhandle}
        />
      )}
    </>
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
  background-color: #ffffff;
  border-radius: 10px;
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
  background-color: #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 14px;
    height: 22px;
    transform: rotate(-180deg);
  }
`;

const StRightBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 14px;
    height: 22px;
  }
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
  background-color: #eeeeee;
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
  justify-content: center;
`;

const StImg = styled.img`
  max-width: 313px;
  max-height: 315px;
  background: #2c2c2c;
`;
