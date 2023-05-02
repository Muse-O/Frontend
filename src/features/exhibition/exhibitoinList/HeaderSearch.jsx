import { useState } from "react";
import { useRecoilState } from "recoil";
import { EXApplyTagsStore } from "../../../hooks/exhibition/EXStore/EXApplyTagsStore";
import * as EXSearch from "./css/exhibitionHeaderCss/EXSearchCss";
export const HeaderSearch = () => {
  const [applyTags, setApplyTags] = useRecoilState(EXApplyTagsStore);
  const [Search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  const onSearchHandler = () => {
    setApplyTags((pre) => {
      return {
        ...pre,
        Search: Search,
      };
    });
    setSearch("");
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearchHandler();
    }
  };
  return (
    <>
      <EXSearch.FilterInputWrap>
        <EXSearch.FilterSearch
          placeholder={applyTags.Search || "제목 검색"}
          value={Search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
        />
        <EXSearch.FilterButton onClick={onSearchHandler}>
          검색하기
        </EXSearch.FilterButton>
      </EXSearch.FilterInputWrap>
    </>
  );
};
