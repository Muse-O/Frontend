import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import ExhibitionList from "../features/exhibition/ExhibitionList";
import { usePostExhibition } from "../hooks/exhibition/usetPostExhibition";
import { useRecoilState } from "recoil";
import { headerStatedefalut } from "../components/headerStore";
import { useEffect } from "react";

function Exhibition() {
  const [createExhibition] = usePostExhibition();
  const [headerState, setHeaderState] = useRecoilState(headerStatedefalut)
  useEffect(()=> {
    setHeaderState({...headerState, 
      home:false, 
      exhibition:true,
      artgram:false,
      mypages:false})
  },[])
  return (
    <>
      <Header />
      <Article>
        <ExhibitionList createExhibition={createExhibition} />
      </Article>
    </>
  );
}

export default Exhibition;
