import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import { Article, Wrap } from "../shared/GlobalStyled";
import * as Artgramparts from '../features/artgram/Artgramparts'
import { useOpenModal } from "../hooks/artgram/useOpenModal";
import ArgramBox from "../features/artgram/ArtgramBox";
import ArtgramDetail from "../features/artgram/ArtgramDetail";
import { useGetartgraminfinity } from "../hooks/artgram/useGetartgraminfinity";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";



const Artgram = () => {
  const navigate = useNavigate()
  // 아트그램 GET 관련 --------------------------------------------------------------------------------------------- //
  const {data,isLoading,isError,fetchNextPage,hasNextPage} = useGetartgraminfinity()
  // useGetartgraminfinity의 결과로 가져온 data.pages를 하나의 배열로 만드는 로직 
  let merged = data?.pages.length > 0 ? [].concat(...data?.pages) : [];
  // console.log(merged)
  // intersection Observe --------------------------------------------------------------------------------------- //
  const lastRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { // entry.isIntersecting 는 Boolean 데이터로 전달받는데, 참조가 되면 true 를 반환한다. 
          fetchNextPage()
        }
      },
      { threshold: 0.4 }
    );
    // 
    if (lastRef.current) {
      console.log("사이드 이팩트 실행");
      observer.observe(lastRef.current);
    }

    return () => {
      console.log("사이드 이팩트 해제");
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
          <Artgramparts.H1 fs="3rem" type="아트그램" children="아트그램 익명" />
          <Artgramparts.MainFlex ai="center" gap="19" fw="wrap">
            {/* 아트그램 개별구역 컴포넌트 -------------------------------------------------------------------------- */}
            {/* artgramId, artgramTitle, imgUrl, imgcount, nickname, profileimg, liked(default : false), likecount */}
            {/* 여기서 사용할 정보는 다음과 같다. 최소한의 정보만을 요청하고, 화면에 뿌려줄 예정이다. */}
            {/* 딥한 정보는 상세모달페이지에서 전달해주려고 한다. */}
            {merged.map( 
              ({
                artgramId,
                artgramTitle,
                imgCount,
                imgUrl,
                likeCount,
                liked,
                scrap,
                profileImg,
                nickname,
                userEmail,
              }) => {
                  return (
                    <ArgramBox
                      key={artgramId}
                      pos={{
                        artgramId,
                        artgramTitle,
                        imgCount,
                        imgUrl,
                        likeCount,
                        liked,
                        scrap,
                        profileImg,
                        nickname,
                        userEmail,
                        openModalhandle
                      }}
                    />
                  );
              }
            )}
          </Artgramparts.MainFlex>
        </Wrap>
        {/* 상세모달페이지 구역 allArtgram + 댓글구역 -------------------------------------------------------------- */}
        {/* 딥한 정보는 상세모달페이지에서 구현하게 되는데, 여기서 가져갈 값은 artgramId 밖에 없다. */}
        {/* 상세모달페이지에서 댓글에 대한 GET 요청을 하듯이, artgramId를 통해서 상세한 요청을 진행하려 한다. */}
        {modalState && (
          <>
            {merged.map(   
              ({artgramId}) =>
                artgramId === modalArtgramId && (
                  <ArtgramDetail
                    key={artgramId}
                    pos={{artgramId, modalState, setModalState }}
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
        <ArtgramWrite onClick={()=> navigate('/artgram/create')}>아트그램 쓰기</ArtgramWrite>
      </Article>
    </>
  );
}

export default Artgram;

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
`