import React from "react";
import styled from "styled-components";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderSelecters } from "./utils/HeaderSelecters";

export const EXheader = () => {
  // 컴포넌트가 들어있는 배열, 보여줘야한 값state
  const [filterItems, selectedFilter, selectHandler, handleClick] =
    HeaderSelecters();

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
        <HeaderSearch />
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
