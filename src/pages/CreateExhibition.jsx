import React from "react";
import { Article } from "../shared/GlobalStyled";
import Header from "../components/Header";
import { usePostExhibition } from "../hooks/exhibition/usetPostExhibition";
import ExhibitionForm from "../features/exhibition/exhibitionCreate/ExhibitionForm";

function CreateExhibition() {
  const [createExhibition] = usePostExhibition();
  return (
    <>
      <Header />
      <Article>
        <ExhibitionForm createExhibition={createExhibition} />
      </Article>
    </>
  );
}

export default CreateExhibition;
