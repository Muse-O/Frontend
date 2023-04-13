import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import ExhibitionList from "../features/exhibition/ExhibitionList";

function Exhibition() {
  return (
    <>
      <Header />
      <Article>
        <ExhibitionList />
      </Article>
    </>
  );
}

export default Exhibition;
