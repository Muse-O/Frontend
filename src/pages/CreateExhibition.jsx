import React from "react";
import { Article } from "../shared/GlobalStyled";
import Header from "../components/Header";
import ExhibitionForm from "../features/exhibition/ExhibitionForm";
import { usePostExhibition } from "../hooks/exhibition/usetPostExhibition";

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
