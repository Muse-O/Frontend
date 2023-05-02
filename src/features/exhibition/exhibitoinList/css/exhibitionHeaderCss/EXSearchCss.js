import styled from "styled-components";

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
  font-size: 16px;
`;

const FilterButton = styled.button`
  height: 100%;
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

export { FilterInputWrap, FilterSearch, FilterButton };
