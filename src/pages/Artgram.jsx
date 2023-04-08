import React from "react";
import Header from "../components/Header";
import { Article, Wrap } from "../shared/GlobalStyled";
import { useGetartgram } from "../hooks/artgram/useGetartgram";
import * as Artgramparts from '../features/artgram/Artgramparts'
import { useOpenModal } from "../hooks/artgram/useOpenModal";
import ArgramBox from "../features/artgram/ArtgramBox";
import ArtgramDetail from "../features/artgram/ArtgramDetail";


function Artgram() {
  // 아트그램 GET 관련 --------------------------------------------------------------------------------------------- //
  const [isLoading, isError, allArtgram] = useGetartgram()
  console.log(allArtgram)
  // GET : allArtgram.Posting 의 시간을 구하는 커스텀 훅

  // 아트그램 상세모달페이지 관련 ------------------------------------------------------------------------------------- //
  const [modalArtgramId, modalState, setModalState, openModalhandle] = useOpenModal()

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
            {allArtgram.map(
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
                      openModalhandle
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
            {allArtgram.map(
              (allArtgram) =>
                allArtgram.artgramId === modalArtgramId && (
                  <ArtgramDetail key={allArtgram.artgramId} pos={{allArtgram, modalState, setModalState}}/>
                )
            )}
          </>
        )}
      </Article>
    </>
  );
}

export default Artgram;