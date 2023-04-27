import styled from "styled-components";

export const EXListApplyBox = ({
  category,
  setCategroy,
  setCategoryVisible,
  setCheckboxes,
  setApplyCategory,
}) => {
  const apply = () => {
    setApplyCategory(category);
  };
  const reset = () => {
    setCategroy("");
    setCheckboxes((prevState) =>
      Object.keys(prevState).reduce((acc, curr) => {
        acc[curr] = false;
        return acc;
      }, {})
    );
  };
  const cancle = () => {
    setCategoryVisible(false);
  };
  return (
    <ApplyContainer>
      <ApplyResetBox onClick={reset}>초기화</ApplyResetBox>
      <ApllyBox>
        <div onClick={cancle}>
          <span>취소</span>
        </div>
        <div onClick={apply}>
          <span>적용하기</span>
        </div>
      </ApllyBox>
    </ApplyContainer>
  );
};

const ApplyResetBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 36px;
`;
const ApllyBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 7px;
`;
const ApplyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 24px 20px 24px;
  border-top: 1px solid #eeeeee;
`;
