import styled from "styled-components";

const NoReview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin: 20px;
  color: #7e7e7e;
`;
const ReviewCoutner = styled.div`
  img {
    width: 20px;
    height: 20px;
  }
`;
const ExhibitioninfoP = styled.p`
  font-family: "S-Core Dream";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 25px;
  margin-top: 80px;
`;
const DeleteIcon = styled.span`
  font-size: 15px;
  :hover {
    cursor: pointer;
  }
`;
const ReviewHashTag = styled.div`
  margin-top: 18px;
  span {
    font-size: 14px;
  }
`;
const ReviewComment = styled.div`
  margin-top: 18px;
  span {
    font-size: 16px;
  }
`;
const Center = styled.span`
  padding: 0px 12px;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
`;
const ReviewHeader = styled.div`
  gap: 10px;
  display: flex;
  span {
    font-size: 12px;
  }
`;

const PageButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background: #555555;
    cursor: pointer;
    transform: translateY(-2px);
  }
  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }
  &[aria-current] {
    background: #8f00ff;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
const ReviewBox = styled.div`
  margin-top: 10px;
  border-top: 1px solid #000000;
  min-height: 120px;
  padding: 10px 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  span {
    color: #5a5a5a;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;
const ShowReview = styled.div``;

const ReviewWrap = styled.div`
  margin-bottom: 100px;
  width: 826px;
`;

export {
  NoReview,
  ReviewCoutner,
  ExhibitioninfoP,
  DeleteIcon,
  ReviewHashTag,
  ReviewComment,
  Center,
  ReviewHeader,
  PageButton,
  ReviewBox,
  Buttons,
  ShowReview,
  ReviewWrap,
};
