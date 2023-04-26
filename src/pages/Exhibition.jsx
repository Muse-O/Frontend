import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import ExhibitionLists from "../features/exhibition/exhibitoinList/ExhibitionLists";

function Exhibition() {
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
