import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePostReview } from "../../hooks/exhibition/usePostReview";
import { useParams } from "react-router-dom";
import { useGetReview } from "../../hooks/exhibition/useGetReview";

function ExhibitionReview() {
  //TODO 리뷰 조회
  //TODO 리뷰 작성
  //TODO 리뷰 삭제
  //TODO 리뷰 수정
  const { id } = useParams();
  const [createExhibition] = usePostReview(id);
  const template = {
    reviewComment: "",
    reviewRating: 0,
  };
  const [review, setReviews] = useState(template);
  const [hashTag, setHashTags] = useState([]);
  const [inputHashTag, setInputHashTag] = useState("");
  const reviewHandler = (event) => {
    const { value, name } = event.target;
    if (name === "reviewRating") {
      setReviews((pre) => {
        return {
          ...pre,
          [name]: Number(value),
        };
      });
    } else {
      setReviews((pre) => {
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
    if (e.target.value.length !== 0 && e.key === "Enter") {
      let updatedHash = [...hashTag];
      updatedHash.push(`#${inputHashTag}`);
      setHashTags(updatedHash);
      setInputHashTag("");
    }
  };
  //제출하기
  const onSubmitReview = (e) => {
    e.preventDefault();
    createExhibition({ hashTag, ...review });
  };
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!리뷰들
  const [page, setPage] = useState(10);
  const [limit, setLimit] = useState(10);
  const [data, isLoading, isError, fetchNextPage, hasNextPage] = useGetReview(
    id,
    limit
  );

  console.log("data", data?.pages[0].exhibitionReviewList);
  const [pageNumbers, setPageNumbers] = useState(0);
  useEffect(() => {
    const exhibitionReviewCnt =
      data?.pages[0].exhibitionReviewList.paginationInfo.exhibitionReviewCnt;
    const PageNation = Math.ceil(exhibitionReviewCnt / limit);
    setPageNumbers(PageNation);
  }, [data]);

  console.log("pageNumbers", pageNumbers);
  return (
    <ReviewWrap>
      <ReviewForm>
        <InputsReview>
          <input
            placeholder="댓글 입력"
            onChange={reviewHandler}
            name="reviewComment"
          />
          <input
            placeholder="해시태그 입력"
            value={inputHashTag}
            onChange={hashTaghandler}
            onKeyPress={upKeyPress}
            name="hashTag"
          />
          <div>
            {hashTag &&
              hashTag.map((hashTag, index) => {
                return <span key={index}>{hashTag}</span>;
              })}
          </div>
        </InputsReview>
        <select onChange={reviewHandler} name="reviewRating">
          <option>평점입력</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button onClick={onSubmitReview}>리뷰 추가</button>
      </ReviewForm>
      <ShowReview>
        {/* {pages?.map((page) => {
          return (
            <Coments>
              <div>
                <span>후기:</span> {page.reviewComment}
              </div>
              <div>
                <span>평점:</span> {page.reviewRating}
              </div>
            </Coments>
          );
        })} */}
        <Buttons>
          {Array(pageNumbers)
            .fill()
            .map((_, i) => (
              <button key={i + 1}>{i + 1}</button>
            ))}
        </Buttons>
      </ShowReview>
    </ReviewWrap>
  );
}

export default ExhibitionReview;
const Buttons = styled.span`
  margin: 10px 10px;
  background-color: #f3c385;
`;
const Coments = styled.div`
  margin: 10px;
  background-color: antiquewhite;
`;
const ShowReview = styled.div`
  height: 500px;
  background-color: #525050;
  overflow: auto;
`;

const InputsReview = styled.div`
  width: 694px;
  height: 115px;
`;

const ReviewForm = styled.div`
  background-color: #ebbaba;
  display: flex;
  height: 120px;
`;
const ReviewWrap = styled.div`
  background-color: #a8a5a5;
  height: 600px;
  margin-bottom: 100px;
`;
