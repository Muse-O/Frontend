import React from "react";
import { Article } from "../shared/GlobalStyled";
import Header from "../components/Header";
import { usePostExhibition } from "../hooks/exhibition/usetPostExhibition";
import ExhibitionForm from "../features/exhibition/exhibitionCreate/ExhibitionForm";
import { useHeaderState } from "../hooks/useHeaderState";

function CreateExhibition() {
  const [createExhibition] = usePostExhibition();
  useHeaderState("exhibition")
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
