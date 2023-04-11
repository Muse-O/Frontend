import React from "react";
import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import { useParams } from "react-router";
import { useDetailGetExibition } from "../hooks/exhibition/useDetailGetExibition";
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
