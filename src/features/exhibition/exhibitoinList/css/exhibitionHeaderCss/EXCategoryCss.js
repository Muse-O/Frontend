import styled from "styled-components";

const CartegoryBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 255px;
`;
// !!포지션박스 중복
const PositionBox = styled.div`
  display: flex;
  margin: 24px 25px 0px 25px;
`;
const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  p {
    font-size: 16px;
  }
`;
const CategoryBox = styled.div`
  display: flex;
`;
const Checkbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
  &:checked {
    background-color: black;
  }

  &:not(:checked) {
    background-color: blue;
  }
`;
const CategoryContainer = styled.div`
  border-top: 1px solid #cccccc;
  padding: 24px 24px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export {
  CartegoryBox,
  PositionBox,
  CheckBoxContainer,
  CategoryBox,
  Checkbox,
  CategoryContainer,
};
