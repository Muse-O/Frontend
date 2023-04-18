import React from "react";
import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import ArtgramBox from "../features/artgram/newartgram/ArtgramBox";
import ArtgramWrite from "../features/artgram/newartgram/ArtgramWrite";
import * as Artgramparts from '../features/artgram/newartgram/ArtgramCss'
import { useInterserctionObserver } from "../hooks/artgram/newArtgram/useIntersectionObserver";
import { useGetartgraminfinity } from "../hooks/artgram/useGetartgraminfinity";

function Artgram() {
  // 아트그램 비동기통신(GET, 조회)관련 훅
  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useGetartgraminfinity();
  let merged = data?.pages.length > 0 ? [].concat(...data?.pages) : [];
  // console.log(merged);
  // InterserctionObserver 포함(window.scrollTo(0,0) 설정)
  const { ref } = useInterserctionObserver(fetchNextPage);

  return (
    <>
      <Header />
      <Article>
        <Artgramparts.Layout>
          <Artgramparts.H1>
            아트그램 <span>Artgram</span>
          </Artgramparts.H1>
          <Artgramparts.Wrap>
            {isLoading || isError
            ? (<div>로딩 중...</div>)
            : merged.map(artgrams => <div key={artgrams.artgramId} children={ <ArtgramBox info={artgrams}/>}/>)}
          </Artgramparts.Wrap>
          {/* infinetyScroll 및 글쓰기 버튼공간 */}
          <ArtgramWrite />
          <Artgramparts.HiddenRef ref={ref} > {hasNextPage ? "새로요청" : "마지막 페이지 입니다"}</Artgramparts.HiddenRef>
        </Artgramparts.Layout>
      </Article>
    </>
  );
}

export default Artgram;