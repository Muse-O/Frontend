import React from "react";
import { Article } from "../shared/GlobalStyled";
import Header from "../components/Header";
import ExhibitionForm from "../features/exhibition/ExhibitionForm";

function CreateExhibition() {
  return (
    <>
      <Header />
      <Article>
        <ExhibitionForm />
      </Article>
    </>
  );
}

export default CreateExhibition;
