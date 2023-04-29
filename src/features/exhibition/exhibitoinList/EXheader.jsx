import React, { useState } from "react";
import styled from "styled-components";
import {
  HeaderCategorySelect,
  HeaderTagSelect,
  HeaderWhereSelect,
} from "./ExhibitionHeaderSelect";

export const EXheader = ({
  setApplySearch,
  setApplyWhere,
  setApplyCategory,
  setApplyHashTag,
}) => {
  const [Search, setSearch] = useState("");
  const [whenVisible, setWhenVisible] = useState(false);
  const [whereVisible, setWhereVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [tagVisible, setTagVisible] = useState(false);
  const selectHandler = (e) => {
    const { name } = e.target;
    if (name === "when") {
      setWhenVisible(!whenVisible);
      setWhereVisible(false);
      setCategoryVisible(false);
      setTagVisible(false);
    } else if (name === "where") {
      setWhereVisible(!whereVisible);
      setWhenVisible(false);
      setCategoryVisible(false);
      setTagVisible(false);
    } else if (name === "category") {
      setCategoryVisible(!categoryVisible);
      setWhereVisible(false);
      setWhenVisible(false);
      setTagVisible(false);
    } else if (name === "tag") {
      setTagVisible(!tagVisible);
      setCategoryVisible(false);
      setWhereVisible(false);
      setWhenVisible(false);
    }
  };
  //검색
  const onChangeSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  const onSearchHandler = () => {
    setApplySearch(Search);
    setSearch("");
  };
  return (
    <ExhibitionHeader>
      <HeaderTitle>전시</HeaderTitle>
      <HeaderFilterWrap>
        <FilterSelect name="when" onClick={selectHandler}>
          When
          <SelectBox visible={whenVisible}>진행중</SelectBox>
        </FilterSelect>
        <FilterSelect name="where" onClick={selectHandler}>
          Where
          <SelectBox visible={whereVisible}>
            <HeaderWhereSelect
              setApplyWhere={setApplyWhere}
              setWhereVisible={setWhereVisible}
            />
          </SelectBox>
        </FilterSelect>
        <FilterSelect name="category" onClick={selectHandler}>
          Category
          <SelectBox visible={categoryVisible}>
            <HeaderCategorySelect
              setApplyCategory={setApplyCategory}
              setCategoryVisible={setCategoryVisible}
            />
          </SelectBox>
        </FilterSelect>
        <FilterSelect name="tag" onClick={selectHandler}>
          Tag
          <SelectBox visible={tagVisible}>
            <HeaderTagSelect
              setApplyHashTag={setApplyHashTag}
              setTagVisible={setTagVisible}
            />
          </SelectBox>
        </FilterSelect>
        <FilterInputWrap>
          {/* //따로 만들기 */}
          <FilterSearch
            Placeholder="검색"
            value={Search}
            onChange={onChangeSearch}
          ></FilterSearch>
          <FilterButton onClick={onSearchHandler}>검색하기</FilterButton>
        </FilterInputWrap>
      </HeaderFilterWrap>
    </ExhibitionHeader>
  );
};

const Div = styled.div`
  background-color: #a6d6a6;
  font-size: 40px;
  height: 380px;
`;

const SelectBox = styled.div`
  z-index: 2;
  background: #ffffff;
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 0;
  top: 49px;
  display: ${({ visible }) =>
    visible ? "block" : "none"}; //버튼식으로 hidden,block 으로 껏키가능 select
`;

const ExhibitionHeader = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
`;

const HeaderTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 48px;
`;

const HeaderFilterWrap = styled.div`
  display: flex;
  flex: 1;
  gap: 24px;
  background: #ffffff;
`;

const FilterSelect = styled.button`
  all: unset; // 모든 기본 스타일 초기화
  box-sizing: border-box;
  width: 200px;
  height: 49px;
  background: #ffffff;
  font-size: 18px;
  border-bottom: 1px solid #5b5b5b;
  padding: 12px 20px;
  position: relative;
  :hover {
    background-color: #f3f3f3;
  }
  /* cursor: pointer; */
`;
const FilterInputWrap = styled.div`
  flex: 1;
  background: #ffffff;
  border: 1px solid #dedede;
  border-radius: 4px;
  margin-left: 24px;
  position: relative;
`;

const FilterSearch = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 12px;
  border-radius: 4px;
`;

const FilterButton = styled.button`
  height: 100%;
  // background: inherit; //!부모의 속성을 따라가는
  background: transparent;
  font-size: 17px;
  font-weight: bold;
  padding: 0 12px;
  position: absolute;
  right: 0;
  :hover {
    cursor: pointer;
  }
`;
