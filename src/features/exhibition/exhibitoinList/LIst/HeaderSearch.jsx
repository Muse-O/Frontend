import { useState } from "react";
import { useRecoilState } from "recoil";
import { EXApplyTagsStore } from "../../../../hooks/exhibition/EXStore/EXApplyTagsStore";
import * as EXSearch from "../css/exhibitionHeaderCss/EXSearchCss";
export const HeaderSearch = () => {
  const [applyTags, setApplyTags] = useRecoilState(EXApplyTagsStore);
  const [Search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  const checkNoGap = /^\s*$/; //공백으로만 이루어져있는지 확인하는것
  const checkDuplicateGap = (checkValue) => {
    return checkValue.trim().replace(/\s+/g, " "); // 입력값을 좌우 공백을 없에고 중복된 공백을 하나의 공백으로 만들어준다.
  };
  const checkSearchValue =
    !checkNoGap.test(Search) && //공백"  "으로만 이루어지지 않아야하고
    Search !== "" && //null값이면 안되고
    applyTags.Search !== checkDuplicateGap(Search); // 이전 입력같이랑 입력된 value값의 앞뒤 공백을 자르고 중복된 공백을 삭제한 상태에서 같으면 안되고

  const onSearchHandler = () => {
    if (checkSearchValue) {
      setApplyTags((pre) => {
        return {
          ...pre,
          Search: Search,
        };
      });
    }
    setSearch((pre) => {
      return checkDuplicateGap(pre);
    });
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" && checkSearchValue) {
      onSearchHandler();
    }
  };

  return (
    <>
      <EXSearch.FilterInputWrap>
        <EXSearch.FilterSearch
          placeholder={"제목 검색"}
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
