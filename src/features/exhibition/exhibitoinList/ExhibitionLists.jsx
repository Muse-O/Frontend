import React, { useState } from "react";
import { useInterserctionObserver } from "../../../hooks/artgram/newArtgram/useIntersectionObserver";
import styled from "styled-components";
import { useGetExhibitioninfinity } from "../../../hooks/exhibition/useGetExhibitioninfinity";
import { EXheader } from "./EXheader";
import { EXListBody } from "./EXListBody";
import { ExCategoryCode } from "../../../shared/EXCodes";
import { useRecoilState, useResetRecoilState } from "recoil";
import { EXApplyTagsStore } from "../../../hooks/exhibition/EXStore/EXApplyTagsStore";

function ExhibitionLists() {
  //적용

  //?리코일 적용
  const [applyTags, setApplyTags] = useRecoilState(EXApplyTagsStore);
  const resetApplyTags = useResetRecoilState(EXApplyTagsStore);
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useGetExhibitioninfinity(10, applyTags);
  console.log("리코일 적용", applyTags);
  //헤더

  let merged =
    data?.pages[0].data.exhibitionList.rows.length > 0
      ? [].concat(...data?.pages[0].data.exhibitionList.rows)
      : [];
  const { ref } = useInterserctionObserver(fetchNextPage);
  //리코일
  let applys = [
    { id: "Where", value: applyTags.Where },
    { id: "category", value: ExCategoryCode[applyTags.category] },
    { id: "HashTag", value: applyTags.HashTag },
    { id: "Search", value: applyTags.Search },
  ];
  //리코일
  const resetTag = () => {
    resetApplyTags();
  };
  //리코일
  const deleteTag = (id) => {
    setApplyTags((pre) => {
      return {
        ...pre,
        [id]: "",
      };
    });
  };
  return (
    <ExhibitionWrap>
      <EXheader />
      <EXTag>
        {applys.filter(
          (apply) => apply.value !== undefined && apply.value !== ""
        ).length > 0 && (
          <>
            {applys
              .filter(
                (apply) => apply.value !== undefined && apply.value !== ""
              )
              .map((apply) => (
                <TagButton key={apply.id}>
                  <TagText>{apply.value}</TagText>
                  <XBox name={apply.id} onClick={() => deleteTag(apply.id)}>
                    x
                  </XBox>
                </TagButton>
              ))}
            <button onClick={resetTag}>초기화</button>
          </>
        )}
      </EXTag>
      <EXListBody isLoading={isLoading} isError={isError} merged={merged} />

      <HiddenRef
        ref={ref}
        children={hasNextPage ? "fetchNextPage요청" : "마지막페이지"}
      />
    </ExhibitionWrap>
  );
}

export default ExhibitionLists;
const EXTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const XBox = styled.div`
  margin-right: 2px;
  flex-grow: 1;
  width: 10px;
  height: 10px;
  color: #fff;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  font-size: 18px;
`;
const TagText = styled.div`
  flex-grow: 3;
  padding-left: 10px;
  color: #fff; /* 텍스트 색상 설정 */
`;
const TagButton = styled.div`
  display: flex;
  margin: 2px;
  padding: 0px 10px;
  align-items: center;
  background: #242424;
  border-radius: 50px;
  min-width: 85px;
  height: 33px;
  gap: 8px;
`;
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
