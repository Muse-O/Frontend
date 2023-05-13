import React from "react";
// import CSS --------------------------------------------------------------------------------------------/
import { Article, Wrap } from "../shared/GlobalStyled";
import * as Artgramparts from '../features/artgram/css/Artgramparts'
// import 컴포넌트 -----------------------------------------------------------------------------------------/
import Header from "../components/Header";
import ArtgramForm from "../features/artgram/createArtgram/ArtgramForm";

function CreateArtgram() {
  return (
    <>
      <Header />
      <Article>
        <Wrap style={{overflowX: "scroll", height:"100vh"}}>
          <Artgramparts.H1
            fs="3rem"
            type="아트그램"
            children="아트그램등록하기"
          />
          <Artgramparts.MainDiv>
            <ArtgramForm/>
          </Artgramparts.MainDiv>
        </Wrap>
      </Article>
    </>
  );
}

export default CreateArtgram;
