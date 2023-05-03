import React from "react";
import { useInterserctionObserver } from "../../../hooks/artgram/newArtgram/useIntersectionObserver";
import styled from "styled-components";
import { useGetExhibitioninfinity } from "../../../hooks/exhibition/useGetExhibitioninfinity";

import { useRecoilState } from "recoil";
import { EXApplyTagsStore } from "../../../hooks/exhibition/EXStore/EXApplyTagsStore";
import { EXTags } from "./LIst/EXTags";
import { EXheader } from "./LIst/EXheader";
import { EXListBody } from "./LIst/EXListBody";

function ExhibitionLists() {
  //?리코일 적용
  const [applyTags, setApplyTags] = useRecoilState(EXApplyTagsStore);
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useGetExhibitioninfinity(10, applyTags);
  let merged = data?.pages.length > 0 ? [].concat(...data?.pages) : [];
  const { ref } = useInterserctionObserver(fetchNextPage);

  return (
    <ExhibitionWrap>
      <EXheader />
      <EXTags applyTags={applyTags} setApplyTags={setApplyTags} />
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
