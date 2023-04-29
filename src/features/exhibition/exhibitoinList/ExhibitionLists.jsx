import React, { useState } from "react";
import { useInterserctionObserver } from "../../../hooks/artgram/newArtgram/useIntersectionObserver";
import styled from "styled-components";
import { useGetExhibitioninfinity } from "../../../hooks/exhibition/useGetExhibitioninfinity";
import { EXheader } from "./EXheader";
import { EXListBody } from "./EXListBody";

function ExhibitionLists() {
  //적용
  const [applycategory, setApplyCategory] = useState("");
  const [applyHashTag, setApplyHashTag] = useState("");
  const [applySearch, setApplySearch] = useState("");
  const [applyWhere, setApplyWhere] = useState("");
  //헤더
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useGetExhibitioninfinity(
      10,
      applycategory,
      applyHashTag,
      applySearch,
      applyWhere
    );
  let merged =
    data?.pages[0].data.exhibitionList.rows.length > 0
      ? [].concat(...data?.pages[0].data.exhibitionList.rows)
      : [];
  const { ref } = useInterserctionObserver(fetchNextPage);
  let tag = [applyWhere, applycategory, applyHashTag, applySearch];
  return (
    <ExhibitionWrap>
      <EXheader
        setApplySearch={setApplySearch}
        setApplyWhere={setApplyWhere}
        setApplyCategory={setApplyCategory}
        setApplyHashTag={setApplyHashTag}
      />
      <EXListBody isLoading={isLoading} isError={isError} merged={merged} />
      <HiddenRef
        ref={ref}
        children={hasNextPage ? "fetchNextPage요청" : "마지막페이지"}
      />
    </ExhibitionWrap>
  );
}

export default ExhibitionLists;

const HiddenRef = styled.div`
  margin-top: 10px;
  color: transparent;
`;
const ExhibitionWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 40px;
  box-sizing: border-box;
  padding: 0 76px;
  overflow: hidden;
`;
