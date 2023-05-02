import React, { useEffect } from "react";
import { Article } from "../shared/GlobalStyled";
import Header from "../components/Header";
import { usePostExhibition } from "../hooks/exhibition/usetPostExhibition";
import ExhibitionForm from "../features/exhibition/exhibitionCreate/ExhibitionForm";
import { useRecoilState, useRecoilValue } from "recoil";
import { headerStateSearch, headerStatedefalut } from "../components/headerStore";

function CreateExhibition() {
  const [createExhibition] = usePostExhibition();
  const [, setHeaderState] = useRecoilState(headerStatedefalut);
  const headerState = useRecoilValue(headerStateSearch)
  useEffect(() => {
    setHeaderState({ ...headerState, exhibition: true });
  }, []);

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
