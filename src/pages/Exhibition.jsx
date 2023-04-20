import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import ExhibitionList from "../features/exhibition/ExhibitionList";
import { usePostExhibition } from "../hooks/exhibition/usetPostExhibition";

function Exhibition() {
  const [createExhibition] = usePostExhibition();
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
