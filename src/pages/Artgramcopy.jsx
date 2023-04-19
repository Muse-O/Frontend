import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import { Article, Wrap } from "../shared/GlobalStyled";
import * as Artgramparts from "../features/artgram/Artgramparts";
import { useOpenModal } from "../hooks/artgram/useOpenModal";
import ArgramBox from "../features/artgram/ArtgramBox";
import ArtgramDetail from "../features/artgram/ArtgramDetail";
import { useGetartgraminfinity } from "../hooks/artgram/useGetartgraminfinity";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Artgramcopy = () => {
  // 아트그램 작성으로 이동하기
  const navigate = useNavigate();
  // 아트그램 GET 서버통신
  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useGetartgraminfinity();
  // infinityScroll 구현을 위해, 페이지별로 불러온 배열 합치기
  let merged = data?.pages.length > 0 ? [].concat(...data?.pages) : [];
  // 아트그램 상세모달페이지 모달 관련 훅
  const [modalArtgramId, modalState, setModalState, openModalhandle] = useOpenModal();

  // 무한스크롤 구현을 위한 부분
  const lastRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.01 }
    );
    if (lastRef.current) {
      // console.log("사이드 이팩트 실행");
      observer.observe(lastRef.current);
    }

    return () => {
      // console.log("사이드 이팩트 해제");
      if (lastRef.current) {
        observer.unobserve(lastRef.current);
      }
    };
  }, []);

  // 아트그램 GET 관련:에러 핸들링 ----------------------------------------------------------------------------------- //
  if (isLoading || isError) {
    return <div>로딩 중....</div>;
  }

  // Argram의 뷰 파트 --------------------------------------------------------------------------------------------- //
  return (
    <>
      <Header />
      <Article>
        <Wrap>
          <Artgramparts.H1
            fs="48px"
            type="아트그램"
            children={
              <>
                아트그램 &nbsp;
                <span className="english">Artgram</span>
              </>
            }
          />
          <Artgramparts.MainFlex ai="center" gap="19" fw="wrap">
            {/* 아트그램 개별구역 컴포넌트 -------------------------------------------------------------------------- */}
            {merged.map(
              (artgram) => {
                return (
                  <ArgramBox
                    key={artgram.artgramId}
                    pos={{...artgram, openModalhandle}}
                  />
                );
              }
            )}
          </Artgramparts.MainFlex>
          {hasNextPage && (
          <button
            style={{ zIndex: "-1"}}
            ref={lastRef}
            onClick={() => fetchNextPage()}
            disabled={isLoading}
            
          >
            {isLoading ? "로딩 중..." : "더 불러오기"}
          </button>
        )}
        </Wrap>
        {/* 상세모달페이지 구역 allArtgram + 댓글구역 -------------------------------------------------------------- */}
        {/* 딥한 정보는 상세모달페이지에서 구현하게 되는데, 여기서 가져갈 값은 artgramId 밖에 없다. */}
        {/* 상세모달페이지에서 댓글에 대한 GET 요청을 하듯이, artgramId를 통해서 상세한 요청을 진행하려 한다. */}
        {modalState && (
          <>
            {merged.map(
              ({ artgramId }) =>
                artgramId === modalArtgramId && (
                  <ArtgramDetail
                    key={artgramId}
                    pos={{ artgramId, modalState, setModalState }}
                  />
                )
            )}
          </>
        )}
        
        <ArtgramWrite onClick={() => navigate("/artgram/create")}>
          아트그램 쓰기
        </ArtgramWrite>
      </Article>
    </>
  );
};

export default Artgramcopy;

const ArtgramWrite = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: fit-content;
  padding: 15px 20px;
  border-radius: 8px;
  color: white;
  font-weight: 900;
  background-color: blue;
`;
