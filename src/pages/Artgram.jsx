import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import { Article, Wrap } from "../shared/GlobalStyled";
import * as Artgramparts from '../features/artgram/Artgramparts'
import { useOpenModal } from "../hooks/artgram/useOpenModal";
import ArgramBox from "../features/artgram/ArtgramBox";
import ArtgramDetail from "../features/artgram/ArtgramDetail";
import { useGetartgraminfinity } from "../hooks/artgram/useGetartgraminfinity";



const Artgram = () => {
  // 아트그램 GET 관련 --------------------------------------------------------------------------------------------- //
  const {data,isLoading,isError,fetchNextPage,hasNextPage} = useGetartgraminfinity()
  // useGetartgraminfinity의 결과로 가져온 data.pages를 하나의 배열로 만드는 로직 
  let merged = data?.pages.length > 0 ? [].concat(...data?.pages) : [];
  

  // intersection Observe --------------------------------------------------------------------------------------- //
  const lastRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("마지막입니다");
          fetchNextPage()
        }
      },
      { threshold: 0.4 }
    );

    if (lastRef.current) {
      observer.observe(lastRef.current);
    }

    return () => {
      if (lastRef.current) {
        observer.unobserve(lastRef.current);
      }
    };
  }, []);

  // 아트그램 상세모달페이지 관련 ------------------------------------------------------------------------------------- //
  const [modalArtgramId, modalState, setModalState, openModalhandle] = useOpenModal()

  // 아트그램 GET 관련:에러 핸들링 ----------------------------------------------------------------------------------- //
  if(isLoading || isError) {
    return <div>로딩 중....</div>
  }
  // Argram의 뷰 파트 --------------------------------------------------------------------------------------------- //
  return (
    <>
      <Header />
      <Article>
        <Wrap>
          <Artgramparts.H1 fs="3rem" type="아트그램" children="아트그램" />
          <Artgramparts.MainFlex ai="center" gap="19" fw="wrap">
            {/* 상세모달페이지 구역 컴포넌트 -------------------------------------------------------------------------- */}
            {merged.map( 
              ({
                artgramId,
                profileImg,
                artgramTitle,
                artgramDesc,
                createdAt,
                profileNickname,
                ArtgramImgs,
                artgramCommentCount
              }) => {
                  return (
                    <ArgramBox
                      key={artgramId}
                      pos={{
                        artgramId,
                        profileImg,
                        artgramTitle,
                        artgramDesc,
                        createdAt,
                        profileNickname,
                        ArtgramImgs,
                        openModalhandle,
                        artgramCommentCount
                      }}
                    />
                  );
              }
            )}
          </Artgramparts.MainFlex>
        </Wrap>
        {/* 상세모달페이지 구역 allArtgram + 댓글구역 -------------------------------------------------------------- */}
        {modalState && (
          <>
            {merged.map(   
              (allArtgram) =>
                allArtgram.artgramId === modalArtgramId && (
                  <ArtgramDetail
                    key={allArtgram.artgramId}
                    pos={{ allArtgram, modalState, setModalState }}
                  />
                )
            )}
          </>
        )}
        {hasNextPage && (
          <button style={{zIndex:"-1"}} ref={lastRef} onClick={() => fetchNextPage()} disabled={isLoading}>
            {isLoading ? "로딩 중..." : "더 불러오기"}
          </button>
        )}
      </Article>
    </>
  );
}

export default Artgram;