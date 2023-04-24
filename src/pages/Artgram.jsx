import React from "react";
// import CSS --------------------------------------------------------------------------------------------/
import { Article } from "../shared/GlobalStyled";
import * as Artgramparts from '../features/artgram/css/ArtgramCss'
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { useInterserctionObserver } from "../hooks/artgram/newArtgram/useIntersectionObserver";
import { useGetartgraminfinity } from "../hooks/artgram/useGetartgraminfinity";
// import 컴포넌트 -----------------------------------------------------------------------------------------/
import Header from "../components/Header";
import ArtgramBox from "../features/artgram/ArtgramBox";
import ArtgramWrite from "../features/artgram/ArtgramWrite";
// Artgram 컴포넌트 ----------------------------------------------------------------------------------------/
function Artgram() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useGetartgraminfinity(); // 비동기통신 GET
  let merged = data?.pages.length > 0 ? [].concat(...data?.pages) : []; // 무한스크롤에 따른, data-merge
  const { ref } = useInterserctionObserver(fetchNextPage); // useRef를 통해서, 무한스크롤 감지를 위한 커스컴 훅

  return (
    <>
      <Header/>
      <Article>
        <Artgramparts.Layout>
          <Artgramparts.H1 children={<>아트그램 <span>Artgram</span></>} />
          <Artgramparts.Wrap 
            children={isLoading || isError
              ? (<div>로딩 중...</div>)
              : merged.map(artgrams => 
                <div key={artgrams.artgramId} children={ <ArtgramBox info={artgrams}/>}/>)}
          />
          <ArtgramWrite /> {/* 아트그램 생성으로 이동하는 버튼 */}
          <Artgramparts.HiddenRef ref={ref} children={hasNextPage ? "fetchNextPage요청" : "마지막페이지"} />
        </Artgramparts.Layout>
      </Article>
    </>
  );
}

export default Artgram;