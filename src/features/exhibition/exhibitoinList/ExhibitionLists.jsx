import React, { useState } from "react";
import { useInterserctionObserver } from "../../../hooks/artgram/newArtgram/useIntersectionObserver";
import styled from "styled-components";
import { useGetExhibitioninfinity } from "../../../hooks/exhibition/useGetExhibitioninfinity";
import { EXheader } from "./EXheader";
import { EXListBody } from "./EXListBody";
import { ExCategoryCode } from "../../../shared/EXCodes";

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
  let applys = [
    { id: "Where", value: applyWhere },
    { id: "Category", value: ExCategoryCode[applycategory] },
    { id: "HashTag", value: applyHashTag },
    { id: "Search", value: applySearch },
  ];
  const resetTag = () => {
    setApplyCategory("");
    setApplyHashTag("");
    setApplySearch("");
    setApplyWhere("");
  };
  const deleteTag = (id) => {
    id === "Category" && setApplyCategory("");
    id === "HashTag" && setApplyHashTag("");
    id === "Search" && setApplySearch("");
    id === "Where" && setApplyWhere("");
  };
  return (
    <ExhibitionWrap>
      <EXheader
        setApplySearch={setApplySearch}
        setApplyWhere={setApplyWhere}
        setApplyCategory={setApplyCategory}
        setApplyHashTag={setApplyHashTag}
      />
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
