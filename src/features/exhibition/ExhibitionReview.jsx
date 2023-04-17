import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { usePostReview } from "../../hooks/exhibition/usePostReview";
import { useParams } from "react-router-dom";
import { useGetReview } from "../../hooks/exhibition/useGetReview";
import { apis } from "../../api/apis";
import jwtDecode from "jwt-decode";
import { cookies } from "../../shared/cookies";
import { useDeleteReview } from "../../hooks/exhibition/useDeleteReview";

function ExhibitionReview({ exhibitionID }) {
  const access_token = cookies.get("access_token");
  const { email } = jwtDecode(access_token);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [reviewData, isLoading] = useGetReview(exhibitionID, limit, offset);
  const pageNum = Math.ceil(
    reviewData?.paginationInfo.exhibitionReviewCnt / limit
  );
  const changePage = (pagenum) => {
    setPage(pagenum);
  };
  const changeLimit = (e) => {
    setLimit(e.target.value);
  };

  //!!!!!!!!!!!!!!삭제 버튼
  const [deleteReview] = useDeleteReview();
  console.log(
    "갯수 나누기",
    reviewData?.paginationInfo.exhibitionReviewCnt / limit
  );
  console.log("가지고온 값", reviewData);
  return (
    <ReviewWrap>
      {reviewData ? (
        <ShowReview>
          <select onChange={changeLimit} name="reviewRating" value={limit}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          {reviewData?.searchExhibitionReviews.map((review, index) => {
            return (
              <>
                <ReviewBox key={index}>
                  <div>작성일:{review.createdAt}</div>
                  <div>후기:{review.reviewComment}</div>
                  <div>평점:{review.reviewRating}</div>
                  <div>
                    헤시테그:
                    {review.ExhibitionHashtags.map((hashtag, index) => {
                      return (
                        <div key={index}>
                          <span>{hashtag.tagName}</span>
                        </div>
                      );
                    })}
                  </div>
                  {review.userEmail === email ? (
                    <>
                      <button>수정하기</button>
                      <button
                        onClick={() => deleteReview(review.exhibitionReviewId)}
                      >
                        삭제하기
                      </button>
                    </>
                  ) : null}
                </ReviewBox>
              </>
            );
          })}
          <Buttons>
            <PageButton
              onClick={() => changePage(page - 1)}
              disabled={page === 1}
            >
              이전
            </PageButton>
            {pageNum &&
              Array(pageNum)
                .fill()
                .map((_, i) => (
                  <PageButton
                    key={i + 1}
                    onClick={() => changePage(i + 1)}
                    aria-current={page === i + 1 ? "page" : null}
                  >
                    {i + 1}
                  </PageButton>
                ))}
            <PageButton
              onClick={() => changePage(page + 1)}
              disabled={page === pageNum}
            >
              다음
            </PageButton>
          </Buttons>
        </ShowReview>
      ) : (
        <div>아직 리뷰가 없어요</div>
      )}
    </ReviewWrap>
  );
}

export default ExhibitionReview;

const PageButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;
  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }
  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }
  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

const ReviewBox = styled.div`
  margin: 10px 0px;
  background-color: #849ff7;
  height: 100px;
  font-size: 30px;
`;
const Buttons = styled.span`
  margin: 10px 10px;
  background-color: #f3c385;
`;
const ShowReview = styled.div`
  background-color: #525050;
`;

const ReviewWrap = styled.div`
  background-color: #a8a5a5;
  margin-bottom: 100px;
`;
