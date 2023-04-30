import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
// import ExhibitionLists from "../features/exhibition/exhibitoinList/ExhibitionLists";
import ExhibitionLists from "../features/exhibition/exhibitionLists/ExhibitionLists";
import { usePostExhibition } from "../hooks/exhibition/usetPostExhibition";
import { useRecoilState } from "recoil";
import { headerStatedefalut } from "../components/headerStore";
import { useEffect } from "react";

function Exhibition() {
  const [createExhibition] = usePostExhibition();
  const [headerState, setHeaderState] = useRecoilState(headerStatedefalut);
  useEffect(() => {
    setHeaderState({
      ...headerState,
      home: false,
      exhibition: true,
      exhibitionecreate: false,
      artgram: false,
      mypages: false,
    });
  }, []);

  return (
    <>
      <Header />
      <Article>
        <ExhibitionLists />
      </Article>
    </>
  );
}

export default Exhibition;
