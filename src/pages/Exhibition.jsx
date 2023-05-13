import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import ExhibitionLists from "../features/exhibition/exhibitoinList/ExhibitionLists";
import { useHeaderState } from "../hooks/useHeaderState";

function Exhibition() {
  useHeaderState("exhibition")
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
