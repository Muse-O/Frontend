import React, { useState } from "react";
import { usePostReview } from "../../hooks/exhibition/usePostReview";
import styled from "styled-components";

function ExhibitionReviewForm({ exhibitionID }) {
  const [createExhibition] = usePostReview(exhibitionID);
  const template = {
    reviewComment: "",
    reviewRating: 0,
  };
  const [postReview, setPostReviews] = useState(template);
  const [hashTag, setHashTags] = useState([]);
  const [inputHashTag, setInputHashTag] = useState("");
  const reviewHandler = (event) => {
    const { value, name } = event.target;
    if (name === "reviewRating") {
      setPostReviews((pre) => {
        return {
          ...pre,
          [name]: Number(value),
        };
      });
    } else {
      setPostReviews((pre) => {
        return {
          ...pre,
          [name]: value,
        };
      });
    }
  };
  const hashTaghandler = (e) => {
    const { value } = e.target;
    setInputHashTag(value);
  };
  const upKeyPress = (e) => {
    const { value } = e.target;
    if (value.length !== 0 && e.key === "Enter") {
      if (hashTag.length > 4) {
        alert("해시태그는 5개 까지 입력가능합니다");
        return;
      }
      let updatedHash = value.trim();
      const regExp = /[\{\}\[\]\/?.;,:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
      if (regExp.test(updatedHash)) {
        alert("태그 내부에 특수문자는 불가능 합니다");
        return;
      }
      if (updatedHash === "") return;
      setHashTags((pre) => {
        return [...pre, `#${updatedHash}`];
      });

      setInputHashTag("");
    }
  };

  //제출하기
  const onSubmitReview = (e) => {
    e.preventDefault();
    createExhibition({ hashTag, ...postReview });
    setPostReviews(template);
    setInputHashTag("");
    setHashTags([]);
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = hashTag.filter(
      (tagItem) => tagItem !== deleteTagItem
    );
    setHashTags(filteredTagList);
  };

  const maxlength = 100;
  return (
    <ReviewForm>
      <InputsReview>
        <InputReviewContainer>
          <InputReview
            type="textarea"
            placeholder="리뷰 입력"
            onChange={reviewHandler}
            value={postReview.reviewComment}
            name="reviewComment"
            maxLength={maxlength}
          />
          <Maxlength>
            {postReview.reviewComment.length} / {maxlength}
          </Maxlength>
        </InputReviewContainer>
        <TagBox>
          {hashTag &&
            hashTag.map((hashTag, index) => {
              return (
                <TagItem pan key={index}>
                  <span>{hashTag}</span>
                  <Button onClick={deleteTagItem}>X</Button>
                </TagItem>
              );
            })}
          <TagInput
            placeholder="해시태그 입력 (최대 5개)"
            value={inputHashTag}
            onChange={hashTaghandler}
            onKeyPress={upKeyPress}
            name="hashTag"
          />
        </TagBox>
      </InputsReview>
      <SubmitWrap>
        <SubmitReviewBtn onClick={onSubmitReview}>
          <span>리뷰추가</span>
        </SubmitReviewBtn>
        <Select
          onChange={reviewHandler}
          name="reviewRating"
          value={postReview.reviewRating}
        >
          <option>평점입력</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Select>
      </SubmitWrap>
    </ReviewForm>
  );
}

export default ExhibitionReviewForm;
const SubmitReviewBtn = styled.div`
  height: 115px;
  border-radius: 8px;
  background-color: gray;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }

  &:active {
    background-color: #333;
  }
  span {
    color: #fff;
    font-size: 12px;
    font-weight: bold;
  }
`;
const SubmitWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const InputReviewContainer = styled.div`
  position: relative;
`;

const InputReview = styled.textarea`
  width: 700px;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  &::-webkit-scrollbar {
    width: 6px;
    background-color: #f8f8f8;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #8f00ff;
    border-radius: 3px;
  }
`;

const Maxlength = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 12px;
  color: #999;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  background-color: white;
  border-radius: 50%;
  color: #8f00ff;
`;
const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: #8f00ff;
  border-radius: 5px;
  color: white;
  font-size: 13px;
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
  align-items: center;
  flex-wrap: wrap;
  padding: 0 10px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  &:focus-within {
    border-color: #000000;
  }
`;

const Span = styled.span``;
const Sect = styled.select``;
const Select = styled.select`
  height: 30px;
`;

const InputsReview = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 723px;
  height: 115px;
  margin-right: 10px;
`;

const ReviewForm = styled.div`
  width: 823px;
  margin-top: 40px;
  display: flex;
  height: 315px;
  flex: 1;
`;

const ReviewInputArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
  height: 130px;
  outline: none;
  transition: border-color 0.3s ease-in-out;
  &::-webkit-scrollbar {
    width: 6px;
    background-color: #f8f8f8;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #8f00ff;
    border-radius: 3px;
  }
`;
