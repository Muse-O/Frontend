import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import ExhibitionLists from "../features/exhibition/exhibitoinList/ExhibitionLists";
import { useRecoilState } from "recoil";
import { headerStatedefalut } from "../components/headerStore";
import { useEffect } from "react";

function Exhibition() {
  const [headerState, setHeaderState] = useRecoilState(headerStatedefalut);
  useEffect(() => {
    setHeaderState({ ...headerState, exhibition: true });
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
