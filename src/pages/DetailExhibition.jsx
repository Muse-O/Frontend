import React from "react";
import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import { useParams } from "react-router";
import { useDetailGetExibition } from "../hooks/exhibition/useDetailGetExibition";

function DetailExhibition() {
  const { id } = useParams();
  const { data, isLoading, isError } = useDetailGetExibition(id);
  console.log("디테일 페이지의 데이터", data);
  return (
    <>
      <Header />
      <Article>
        <div>컨탠츠 구역</div>
      </Article>
    </>
  );
}

export default DetailExhibition;
