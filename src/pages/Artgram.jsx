import React from "react";
import Header from "../components/Header";
import { Article, Wrap } from "../shared/GlobalStyled";
// import { useGetartgram } from "../hooks/artgram/useGetartgram";
import * as Artgramparts from '../features/artgram/Artgramparts'
import { useOpenModal } from "../hooks/artgram/useOpenModal";
import ArgramBox from "../features/artgram/ArtgramBox";
import ArtgramDetail from "../features/artgram/ArtgramDetail";
import { useGetartgraminfinity } from "../hooks/artgram/useGetartgraminfinity";


const Artgram = () => {
  // 아트그램 GET 관련 --------------------------------------------------------------------------------------------- //
  // const [isLoading, isError, allArtgram] = useGetartgram()
  const {data,isLoading,isError,fetchNextPage,hasNextPage} = useGetartgraminfinity()
  console.log(data);
  // useGetartgraminfinity의 결과로 가져온 data.pages를 하나의 배열로 만드는 로직 
  let merged = data?.pages.length > 0 ? [].concat(...data?.pages) : [];
  // useGetartgraminfinity로 받아온 데이터를 화면에 따라서 감지하고 fetchNextPage() 실행하는 로직

  // 04 intersection Observer API 설정하기 

  // 아트그램 상세모달페이지 관련 ------------------------------------------------------------------------------------- //
  const [modalArtgramId, modalState, setModalState, openModalhandle] = useOpenModal()

  // 아트그램 무한스크롤 관련 ---------------------------------------------------------------------------------------- //


  // 아트그램 GET 관련:에러 핸들링 ----------------------------------------------------------------------------------- //
  if(isLoading || isError) {
    return <div>로딩 중....</div>
  }
  // ----------------------------------------------------------------------------------------------------------- //
  return (
    <>
      <Header />
      <Article>
        <Wrap>
          <Artgramparts.H1 fs="3rem" type="아트그램" children="아트그램" />
          <Artgramparts.MainFlex ai="center" gap="19" fw="wrap">
            {/* 상세모달페이지 구역 컴포넌트 -------------------------------------------------------------------------- */}
            {/* {allArtgram.map( */}
            {merged.map( 
              ({
                artgramId,
                profileImg,
                artgramTitle,
                artgramDesc,
                createdAt,
                profileNickname,
                ArtgramImgs,
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
            {/* {allArtgram.map( */}
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
          <button onClick={() => fetchNextPage()} disabled={isLoading}>
            {isLoading ? "로딩 중..." : "더 불러오기"}
          </button>
        )}
      </Article>
    </>
  );
}

export default Artgram;