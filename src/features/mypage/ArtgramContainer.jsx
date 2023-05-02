import React, { useState } from "react";
import { useGetLikedArtgramInfo } from "../../hooks/mypage/useGetLikedArtgramInfo";
import { useGetMyArtgramInfo } from "../../hooks/mypage/useGetMyArtgramInfo";
import { useGetScrapArtgramInfo } from "../../hooks/mypage/useGetScrapArtgramInfo";
import { useOpenModal } from "./../../hooks/artgram/useOpenModal";
import ArtgarmDetailModal from "../artgram/detailModal/ArtgarmDetailModal";
import * as Style from "../mypage/css/ArtgramContainerStyle";

function ArtgramContainer() {
  const { modalState, openModalhandle } = useOpenModal(); //아트그램 모달
  const [artgramId, setArtgramId] = useState(""); //id를 넘겨주기 위한 state

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

  //탭 메뉴 클릭시 처음 페이지로 돌아옴
  const selectMenuHandler = id => {
    clickTab(id);
    setLikedNum(0);
    setScrapArtgramNum(0);
    setMyArtgramNum(0);
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
      <Style.StContainer>
        <Style.StArtgram>아트그램</Style.StArtgram>
        <Style.StArtgramBox>
          <Style.StWrap>
            <Style.StTabWrap>
              {menuArr.map(el => (
                <Style.StTab
                  key={el.id}
                  onClick={() => selectMenuHandler(el.id)}
                  select={menuArr[currentTab].id === el?.id}
                >
                  {el.name}
                  <Style.StTabCount
                    selectCount={menuArr[currentTab].id === el?.id}
                  >
                    {el?.count?.myArtgramCnt ? el?.count?.myArtgramCnt : 0}
                  </Style.StTabCount>
                </Style.StTab>
              ))}
            </Style.StTabWrap>

            <Style.StImgBtnBox>
              <Style.StLeftBtn
                onClick={getBackDataHandler}
                disabled={
                  (menuArr[currentTab].id === 0 &&
                    !LikedArtgramInfo?.paginationInfo?.hasBackPage) ||
                  (menuArr[currentTab].id === 1 &&
                    !ScrapArtgramInfo?.paginationInfo?.hasBackPage) ||
                  (menuArr[currentTab].id === 2 &&
                    !MyArtgramInfo?.paginationInfo?.hasBackPage)
                }
              ></Style.StLeftBtn>
              <Style.StImgBox>
                {menuArr[currentTab].content.map(list => {
                  return list.map(info => {
                    return (
                      <Style.StImgWrap
                        key={info.artgram_id}
                        onClick={() => detailArtgramModal(info)}
                      >
                        <Style.StImg
                          src={info.imgUrl}
                          alt={info.artgram_title}
                        />
                      </Style.StImgWrap>
                    );
                  });
                })}
              </Style.StImgBox>
              <Style.StRightBtn
                disabled={
                  (menuArr[currentTab].id === 0 &&
                    !LikedArtgramInfo?.paginationInfo?.hasNextPage) ||
                  (menuArr[currentTab].id === 1 &&
                    !ScrapArtgramInfo?.paginationInfo?.hasNextPage) ||
                  (menuArr[currentTab].id === 2 &&
                    !MyArtgramInfo?.paginationInfo?.hasNextPage)
                }
                onClick={getNextDataHandler}
              ></Style.StRightBtn>
            </Style.StImgBtnBox>
          </Style.StWrap>
        </Style.StArtgramBox>
      </Style.StContainer>

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
