import React, { useState } from "react";
import styled from "styled-components";
import {
  HeaderCategorySelect,
  HeaderSearch,
  HeaderTagSelect,
  HeaderWhereSelect,
} from "./ExhibitionHeaderSelect";

export const EXheader = ({
  setApplySearch,
  setApplyWhere,
  setApplyCategory,
  setApplyHashTag,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const selectHandler = (e) => {
    const { name } = e.target;
    if (selectedFilter === name) {
      setSelectedFilter("");
    } else {
      setSelectedFilter(name);
    }
  };
  const handleClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
  };
  const filterItems = [
    {
      name: "when",
      label: "When",
      component: <div>진행중</div>,
    },
    {
      name: "where",
      label: "Where",
      component: (
        <HeaderWhereSelect
          setApplyWhere={setApplyWhere}
          setSelectedFilter={setSelectedFilter}
        />
      ),
    },
    {
      name: "category",
      label: "Category",
      component: (
        <HeaderCategorySelect
          setApplyCategory={setApplyCategory}
          setSelectedFilter={setSelectedFilter}
        />
      ),
    },
    {
      name: "tag",
      label: "Tag",
      component: (
        <HeaderTagSelect
          setApplyHashTag={setApplyHashTag}
          setSelectedFilter={setSelectedFilter}
        />
      ),
    },
  ];
  return (
    <ExhibitionHeader>
      <HeaderTitle>전시</HeaderTitle>
      <HeaderFilterWrap>
        {filterItems.map(({ name, label, component }) => (
          <FilterSelect key={name} name={name} onClick={selectHandler}>
            {label}
            <SelectBox visible={selectedFilter === name} onClick={handleClick}>
              {component}
            </SelectBox>
          </FilterSelect>
        ))}
        <HeaderSearch setApplySearch={setApplySearch} />
      </HeaderFilterWrap>
    </ExhibitionHeader>
  );
};

const SelectBox = styled.div`
  z-index: 2;
  background: #ffffff;
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 0;
  top: 49px;
  display: ${({ visible }) => (visible ? "block" : "none")};
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
  all: unset;
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
  cursor: pointer;
`;
