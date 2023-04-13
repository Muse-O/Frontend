import React from "react";
import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import ExhibitionDetail from "../features/exhibition/ExhibitionDetail";

function DetailExhibition() {
  return (
    <>
      <Header />
      <Article>
        <ExhibitionDetail />
      </Article>
    </>
  );
}

export default DetailExhibition;
