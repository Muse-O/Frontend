import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import styled from "styled-components";
import { apis } from "../api/apis";
import { useGetExhibition } from "../hooks/exhibition/useGetExhibition";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

//TODO 1.초반에 받아오는 값설정 필요. V
//TODO 2.마지막 Element 안보이게 설정 필요.V
//TODO 3.파일랜덤값 나오는거 수정 필요 (서버이슈)V
//TODO 4.리액트 쿼리로 리팩토링 필요.
//TODO 5.LAZY LOAD리팩토링 필요.

function Exhibition() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(10);
  const [load, setLoad] = useState(1);
  const preventRef = useRef(true);
  const obsRef = useRef(null);
  const endRef = useRef(true);
  const [exhibitionData, exhibitionIsLoading] = useGetExhibition();
  const navigator = useNavigate();
  // console.log("exhibitionData", exhibitionData);

  //*컴포넌트가 마운트 될 때  옵저버를 생성하고 언마운트될 경우 옵저버를 해제
  useEffect(() => {
    getFirstItem();
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  //*페이지가 변경될때마다 실행
  useEffect(() => {
    getItem();
  }, [page]);

  //*element를 확인될때 page를 올림
  const obsHandler = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && preventRef.current && endRef.current) {
      preventRef.current = false;
      setPage((prev) => prev + 1);
    }
  };
  //*처음 받아오는값
  const getFirstItem = useCallback(async () => {
    const res = await apis.get("/exhibition");
    console.log("처음 받아오는값", res);
    endRef.current = res.data.paginationInfo.hasNextPage;
    if (res.data) {
      setList((prev) => [...prev, ...res.data.exhibitionList.rows]);
      preventRef.current = true;
    } else {
      console.log(res);
    }
  }, []);

  const getItem = useCallback(async () => {
    setLoad(true);
    const res = await apis.get(`/exhibition?limit=1&offset=${page}`);
    console.log("무한스크롤으로 받아오는 값", res);
    endRef.current = res.data.paginationInfo.hasNextPage;
    if (res.data) {
      setList((prev) => [...prev, { ...res.data.exhibitionList.rows[0] }]);
      preventRef.current = true;
    } else {
      console.log(res);
    }
    setLoad(false);
  }, [page]);

  return (
    <>
      <Header />
      <Article>
        <ExhibitionWrap>
          <ExhibitionHeader>
            <HeaderTitle>전시</HeaderTitle>
            <HeaderFilterWrap>
              <FilterSelect>
                When
                <FilterSelectCalender>23 24</FilterSelectCalender>
              </FilterSelect>
              <FilterSelect>Where</FilterSelect>
              <FilterSelect>Category</FilterSelect>
              <FilterSelect>Tag</FilterSelect>
              <FilterInputWrap>
                <FilterSearch Placeholder="검색"></FilterSearch>
                <FilterButton>검색하기</FilterButton>
              </FilterInputWrap>
            </HeaderFilterWrap>
          </ExhibitionHeader>
          {list && (
            <>
              {list.map((item) => (
                <ExhibitionItem key={item.exhibitionId}>
                  <ImageBox src={item.postImage} />
                  <ExhibitionInfoBox>
                    <ExhibitionDate>
                      {item.startDate + " ~ " + item.endDate}
                    </ExhibitionDate>
                    <ExhibitionTitle>{item.exhibitionTitle}</ExhibitionTitle>
                  </ExhibitionInfoBox>
                  {/* <div>제목{item.exhibitionTitle}</div>
                  <div>작성자email{item.authorNickName}</div> */}

                  <ExhibitionInfoBox2>
                    <ExhibitionDatailInfo>
                      {item.location}
                      {
                        // 입장료
                        item.entranceFee
                      }
                      {
                        // 작가
                        item.authorNickName
                      }
                      {
                        // 작품 수
                        item.artWorkCnt
                      }
                    </ExhibitionDatailInfo>
                    <ExhibitionMore
                      onClick={() => {
                        navigator(`/exhibition/detail/${item.exhibitionId}`);
                      }}
                    ></ExhibitionMore>
                  </ExhibitionInfoBox2>
                </ExhibitionItem>
              ))}
            </>
          )}
          {/* {load && <div ref={obsRef}>로딩 중</div>} */}
          <div ref={obsRef}>스피너</div>
        </ExhibitionWrap>
      </Article>
    </>
  );
}

export default Exhibition;

const Div = styled.div`
  background-color: #a6d6a6;
  font-size: 40px;
  height: 380px;
`;

const FilterSelectCalender = styled.div`
  width: 200px;
  height: 200px;
  z-index: 2;
  background: #ffffff;
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 0;
  top: 49px;
  display: block; //버튼식으로 hidden,block 으로 껏키가능 select
`;

const ExhibitionHeader = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  background-color: #f3f3f3;
`;

const HeaderTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 48px;
`;

const HeaderFilterWrap = styled.div`
  display: flex;
  flex: 1;
  gap: 24px;
  background: #ffffff;
`;

const FilterSelect = styled.button`
  all: unset; // 모든 기본 스타일 초기화
  box-sizing: border-box;
  width: 200px;
  height: 49px;
  background: #ffffff;
  font-size: 18px;
  border-bottom: 1px solid #5b5b5b;
  padding: 12px 20px;
  cursor: pointer;
  position: relative;

  :hover {
    background-color: #f3f3f3;
  }
`;

const FilterInputWrap = styled.div`
  flex: 1;
  background: #ffffff;
  border: 1px solid #dedede;
  border-radius: 4px;
  margin-left: 24px;
  position: relative;
`;

const FilterSearch = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 12px;
  border-radius: 4px;
`;

const FilterButton = styled.button`
  height: 100%;
  // background: inherit; //!부모의 속성을 따라가는
  background: transparent;
  font-size: 17px;
  font-weight: bold;
  padding: 0 12px;
  position: absolute;
  right: 0;
  cursor: pointer;
`;

const ExhibitionWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 40px;
  border: 1px solid dodgerblue;
  box-sizing: border-box;
  padding: 0 76px;
  overflow: hidden;
`;

const ExhibitionItem = styled.div`
  display: flex;
  box-sizing: border-box;
  font-size: 40px;
  height: 380px;
  background: #d9d9d9;
`;

const ImageBox = styled.img`
  width: 266px;
  height: auto;
  object-fit: cover;
`;

const ExhibitionInfoBox = styled.div`
  font-size: 1em; //!부모 따라가기 em이랑 rem
  max-width: 690px;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 40px;
`;

const ExhibitionDate = styled.p`
  font-size: 1em;
`;

const ExhibitionTitle = styled.p`
  display: flex;
  justify-content: flex-end;
`;

const ExhibitionDatailInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-left: 1px dashed gray;
  padding: 84px;
  box-sizing: border-box;
`;

const ExhibitionMore = styled.div`
  display: flex;
  max-width: 76px;
  flex: 1;
  flex-direction: column;
  border-left: 1px dashed gray;
  box-sizing: border-box;
`;

const ExhibitionInfoBox2 = styled.div`
  max-width: 569px;
  display: flex;
  flex: 1;
  flex-direction: row;
`;
