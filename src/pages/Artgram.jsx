import React from "react";
// import CSS --------------------------------------------------------------------------------------------/
import { Article } from "../shared/GlobalStyled";
import * as Artgramparts from '../features/artgram/css/ArtgramCss'
// import Library-----------------------------------------------------------------------------------------/
import { useRecoilValue } from "recoil";
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { useHeaderState } from "../hooks/useHeaderState";
import { useGetartgraminfinity } from "../hooks/artgram/useGetartgraminfinity";
import { useInterserctionObserver } from "../hooks/artgram/useIntersectionObserver";
// import 컴포넌트 -----------------------------------------------------------------------------------------/
import Header from "../components/Header";
import TopButton from "../components/TopButton";
import ArtgramBox from "../features/artgram/ArtgramBox";
import ArtgramWrite from "../features/artgram/ArtgramWrite";
import { decodeUserRole } from "../features/login/loginTokenStore";

function Artgram() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useGetartgraminfinity(); 
  let merged = data?.pages.length > 0 ? [].concat(...data?.pages) : []; 
  const { ref } = useInterserctionObserver(fetchNextPage); 
  const userRole = useRecoilValue(decodeUserRole)
  useHeaderState("artgram")
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
                <ArtgramBox key={artgrams.artgramId} info={artgrams}/>)}
          />
          
          <Artgramparts.HiddenRef ref={ref} children={hasNextPage ? "fetchNextPage요청" : "마지막페이지"} />
          <TopButton/>
          {userRole && <Artgramparts.WriteLayout children={<ArtgramWrite />}/>}
        </Artgramparts.Layout>
      </Article>
    </>
  );
}

export default Artgram;