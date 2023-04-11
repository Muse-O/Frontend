import React from "react";
import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import ExhibitionUpdate from "../features/exhibition/ExhibitionUpdate";

function UpdateExhibition() {
  return (
    <>
      <Header />
      <Article>
        <ExhibitionUpdate />
      </Article>
    </>
  );
}

export default UpdateExhibition;
