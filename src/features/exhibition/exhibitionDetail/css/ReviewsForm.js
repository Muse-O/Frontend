import styled from "styled-components";

const ReviewSubmitBtn = styled.button`
  display: flex;
  flex: 1;
  max-width: 100px;
  background-color: unset;
  border: 1px solid #242424;
  border-radius: 10px;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :active {
    background-color: #bdbdbd;
  }
`;
const RatingReview = styled.span`
  font-size: 12px;
  color: #5a5a5a;
`;
const StarRating = styled.span`
  font-size: 20px;
`;
const StarsBox = styled.div`
  display: flex;
`;
const ReviewStar = styled.img`
  width: 4em;
  height: 4em;
  cursor: pointer;
`;
const HashTagCancleImg = styled.img`
  width: 0.9em;
  cursor: pointer;
`;
const ReviewInputBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 487px;
  border-radius: 10px;
  border: 1px solid black;
`;
const ReviewCount = styled.div`
  gap: 10px;
  display: flex;
  flex: 1;
  max-width: 212px;
  border: 1px solid #5a5a5a;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InputReview = styled.textarea`
  width: 100%;
  flex: 2;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
  &:focus {
    outline: none;
  }
  &::-webkit-scrollbar {
    width: 6px;
    background-color: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #8f00ff;
    border-radius: 3px;
  }
  border: none;
  border-radius: 10px;
  font-size: 16px;
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  margin: 5px;
  padding: 10px;
  background: #5a5a5a;
  border-radius: 50px;
  color: white;
  font-size: 12px;
`;

const TagInput = styled.input`
  margin-left: 10px;
  font-size: 15px;
  height: 30px;
  display: flex;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`;
const TagBox = styled.div`
  display: flex;
  flex: 0.8;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 10px;
  width: 100%;
  border: none;
  border-top: 1px solid black;
  border-radius: 0 0 10px 10px;
  font-size: 16px;
`;

const ReviewForm = styled.div`
  width: 823px;
  margin-top: 40px;
  display: flex;
  height: 170px;
  flex: 1;
  display: flex;
  height: 170px;
  flex: 1;

  & > :first-child {
    margin-right: 8px;
  }

  & > :last-child {
    margin-left: 16px;
  }
`;

export {
  ReviewSubmitBtn,
  RatingReview,
  StarRating,
  StarsBox,
  ReviewStar,
  HashTagCancleImg,
  ReviewInputBox,
  ReviewCount,
  InputReview,
  TagItem,
  TagInput,
  TagBox,
  ReviewForm,
};
