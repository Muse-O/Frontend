import React from "react";
import { useDeleteReview } from "../../../../hooks/exhibition/useDeleteReview";
import { AiOutlineDelete } from "react-icons/ai";
import sparkle from "../../../../assets/imgs/exhibition/sparkle.png";
import sparkle_full_gradient from "../../../../assets/imgs/exhibition/sparkle_full_gradient.png";
import { GetReviews } from "../utils/GetReviews";
import * as RD from "../css/ReviewsDetail";

function ExhibitionReview({ exhibitionID }) {
  //페이지네이션 review데이터와 조작을 위한 함수
  const [reviewData, userEmail, changePage, page, pageNum] =
    GetReviews(exhibitionID);
  //review 삭제용
  const [deleteReview] = useDeleteReview();
  return (
    <RD.ReviewWrap>
      {reviewData ? (
        <RD.ShowReview>
          <RD.ExhibitioninfoP>
            후기{reviewData.paginationInfo.exhibitionReviewCnt}
          </RD.ExhibitioninfoP>
          {/* //TODO 추가기능 구현 필요 */}
          {/* <div>
            <select onChange={changeLimit} name="reviewRating" value={limit}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <button>최신순</button>
            <button>평점순</button>
          </div> */}
          {reviewData?.searchExhibitionReviews.map((review, index) => {
            return (
              <>
                <RD.ReviewBox key={index}>
                  <RD.ReviewHeader>
                    <RD.ReviewCoutner>
                      {[1, 2, 3, 4, 5].map((index) => (
                        <img
                          key={index}
                          src={
                            index <= review.reviewRating
                              ? sparkle_full_gradient
                              : sparkle
                          }
                          alt="star"
                        />
                      ))}
                    </RD.ReviewCoutner>
                    <RD.Center>{review.userEmail}</RD.Center>
                    <span>{review.createdAt.slice(0, 10)}</span>
                    {review.userEmail === userEmail ? (
                      <RD.DeleteIcon>
                        <AiOutlineDelete
                          onClick={() =>
                            deleteReview(review.exhibitionReviewId)
                          }
                        />
                      </RD.DeleteIcon>
                    ) : null}
                  </RD.ReviewHeader>
                  <RD.ReviewComment>
                    <span>{review.reviewComment}</span>
                  </RD.ReviewComment>
                  {review.ExhibitionHashtags.length !== 0 && (
                    <RD.ReviewHashTag>
                      {review.ExhibitionHashtags.map((hashtag, index) => {
                        return <span key={index}>{hashtag.tagName}</span>;
                      })}
                    </RD.ReviewHashTag>
                  )}
                </RD.ReviewBox>
              </>
            );
          })}
          <RD.Buttons>
            <RD.PageButton
              onClick={() => changePage(page - 1)}
              disabled={page === 1}
            >
              이전
            </RD.PageButton>
            {pageNum &&
              Array(pageNum)
                .fill()
                .map((_, i) => (
                  <RD.PageButton
                    key={i + 1}
                    onClick={() => changePage(i + 1)}
                    aria-current={page === i + 1 ? "page" : null}
                  >
                    {i + 1}
                  </RD.PageButton>
                ))}
            <RD.PageButton
              onClick={() => changePage(page + 1)}
              disabled={page === pageNum}
            >
              다음
            </RD.PageButton>
          </RD.Buttons>
        </RD.ShowReview>
      ) : (
        <RD.NoReview>아직 리뷰가 없어요</RD.NoReview>
      )}
    </RD.ReviewWrap>
  );
}

export default ExhibitionReview;
