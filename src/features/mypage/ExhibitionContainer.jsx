import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLikedExhibitionInfo } from "../../hooks/mypage/useGetLikedExhibitionInfo";
import { useGetMyExhibitionInfo } from "../../hooks/mypage/useGetMyExhibitionInfo";
import { useGetScrapExhibitionInfo } from "../../hooks/mypage/useGetScrapExhibitionInfo";
import * as Style from "../mypage/css/ExhibitionContainerStyle";

function ExhibitionContainer() {
  const navigate = useNavigate();

  const { LikedExhibitionInfo, likedNum, setLikedNum } =
    useGetLikedExhibitionInfo();
  const { MyExhibitionInfo, myExhibitionNum, setMyExhibitionNum } =
    useGetMyExhibitionInfo();
  const { ScrapExhibitionInfo, scrapExhibitionNum, setScrapExhibitionNum } =
    useGetScrapExhibitionInfo();

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

  //탭 메뉴 클릭시 처음 페이지로 돌아옴
  const selectMenuHandler = id => {
    clickTab(id);
    setLikedNum(0);
    setScrapExhibitionNum(0);
    setMyExhibitionNum(0);
  };

  //이전 데이터 불러오기
  const getBackDataHandler = () => {
    //데이터의 첫 페이지보다 작은 페이지로 이동하지 않도록 설정
    if (menuArr[currentTab].id === 0) {
      setLikedNum(likedNum => Math.max(likedNum - 5, 0));
    } else if (menuArr[currentTab].id === 1) {
      setScrapExhibitionNum(scrapExhibitionNum =>
        Math.max(scrapExhibitionNum - 5, 0)
      );
    } else if (menuArr[currentTab].id === 2) {
      setMyExhibitionNum(myExhibitionNum => Math.max(myExhibitionNum - 5, 0));
    }
  };

  //다음 데이터 불러오기
  const getNextDataHandler = () => {
    if (menuArr[currentTab].id === 0) {
      setLikedNum(likedNum => likedNum + 5);
    } else if (menuArr[currentTab].id === 1) {
      setScrapExhibitionNum(scrapExhibitionNum => scrapExhibitionNum + 5);
    } else if (menuArr[currentTab].id === 2) {
      setMyExhibitionNum(myExhibitionNum => myExhibitionNum + 5);
    }
  };

  //전시 상세페이지 이동
  const detailExhibitionPage = info => {
    const exhibitionId = info?.exhibition_id;
    navigate(`/exhibition/detail/${exhibitionId}`);
  };

  return (
    <Style.StContainer>
      <Style.StExhibition>전시</Style.StExhibition>
      <Style.StExhibitionBox>
        <Style.StWrap>
          <Style.StTabWrap>
            {menuArr.map(el => (
              <Style.StTab
                key={el.id}
                onClick={() => selectMenuHandler(el?.id)}
                select={menuArr[currentTab].id === el?.id}
              >
                {el.name}
                <Style.StTabCount
                  selectCount={menuArr[currentTab].id === el?.id}
                >
                  {el?.count?.myExhibitionCnt ? el?.count?.myExhibitionCnt : 0}
                </Style.StTabCount>
              </Style.StTab>
            ))}
          </Style.StTabWrap>

          <Style.StImgBtnBox>
            <Style.StLeftBtn
              onClick={getBackDataHandler}
              disabled={
                (menuArr[currentTab].id === 0 &&
                  !LikedExhibitionInfo?.paginationInfo?.hasBackPage) ||
                (menuArr[currentTab].id === 1 &&
                  !ScrapExhibitionInfo?.paginationInfo?.hasBackPage) ||
                (menuArr[currentTab].id === 2 &&
                  !MyExhibitionInfo?.paginationInfo?.hasBackPage)
              }
            ></Style.StLeftBtn>

            <Style.StImgBox>
              {menuArr[currentTab].content.map(list => {
                return list.map(info => {
                  return (
                    <Style.StImgWrap
                      key={info.exhibition_id}
                      onClick={() => detailExhibitionPage(info)}
                    >
                      <Style.StImg
                        src={info.post_image}
                        alt={info.exhibition_title}
                      />
                    </Style.StImgWrap>
                  );
                });
              })}
            </Style.StImgBox>
            <Style.StRightBtn
              disabled={
                (menuArr[currentTab].id === 0 &&
                  !LikedExhibitionInfo?.paginationInfo?.hasNextPage) ||
                (menuArr[currentTab].id === 1 &&
                  !ScrapExhibitionInfo?.paginationInfo?.hasNextPage) ||
                (menuArr[currentTab].id === 2 &&
                  !MyExhibitionInfo?.paginationInfo?.hasNextPage)
              }
              onClick={getNextDataHandler}
            ></Style.StRightBtn>
          </Style.StImgBtnBox>
        </Style.StWrap>
      </Style.StExhibitionBox>
    </Style.StContainer>
  );
}

export default ExhibitionContainer;
