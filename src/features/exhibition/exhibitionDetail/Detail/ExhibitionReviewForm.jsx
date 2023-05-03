import React from "react";
import { usePostReview } from "../../../../hooks/exhibition/usePostReview";
import cancel_WGray from "../../../../assets/imgs/common/cancel_WGray.png";
import sparkle from "../../../../assets/imgs/exhibition/sparkle.png";
import sparkle_full_gradient from "../../../../assets/imgs/exhibition/sparkle_full_gradient.png";
import { ExhibitioninfoP } from "../css/ReviewsDetail";
import { ReviewHashTag } from "../utils/ReviewHashTag";
import { ReviewRating } from "../utils/ReviewRating";
import { PostReview } from "../utils/PostReview";
import * as RF from "../css/ReviewsForm";
function ExhibitionReviewForm({ exhibitionID, reviewRef }) {
  const maxlength = 100;
  //쿼리
  const [createReview] = usePostReview(exhibitionID);
  //헤시태그
  const [
    hashTag,
    setHashTags,
    inputHashTag,
    setInputHashTag,
    hashTaghandler,
    upKeyPress,
    deleteTagItem,
  ] = ReviewHashTag();
  //별점 만들기
  const [rating, setRating, handleHover, ratingReview] = ReviewRating();
  //리뷰 제출
  const [reviewHandler, postReview, onSubmitReview] = PostReview(
    createReview,
    hashTag,
    setRating,
    setInputHashTag,
    setHashTags
  );
  return (
    <>
      <ExhibitioninfoP>후기작성</ExhibitioninfoP>
      <RF.ReviewForm>
        <RF.ReviewCount>
          <RF.StarsBox>
            {[1, 2, 3, 4, 5].map((value) => (
              <RF.ReviewStar
                name={"reviewRating"}
                data-value={value}
                key={value}
                src={value <= rating ? sparkle_full_gradient : sparkle}
                alt={`${value} star`}
                onMouseEnter={() => handleHover(value)}
                onMouseLeave={() => handleHover(postReview.reviewRating)}
                onClick={reviewHandler}
              />
            ))}
          </RF.StarsBox>
          <RF.StarRating> {rating}</RF.StarRating>
          <RF.RatingReview> {ratingReview[rating]}</RF.RatingReview>
        </RF.ReviewCount>
        <RF.ReviewInputBox>
          <RF.InputReview
            ref={reviewRef}
            type="textarea"
            placeholder="리뷰 입력"
            onChange={reviewHandler}
            value={postReview.reviewComment}
            name="reviewComment"
            maxLength={maxlength}
          />
          <RF.TagBox>
            {hashTag &&
              hashTag.map((hashTag, index) => {
                return (
                  <RF.TagItem pan key={index}>
                    <span>{hashTag}</span>
                    <RF.HashTagCancleImg
                      src={cancel_WGray}
                      alt="Cancel"
                      onClick={deleteTagItem}
                    />
                  </RF.TagItem>
                );
              })}
            <RF.TagInput
              placeholder="해시태그 입력 (최대 5개)"
              value={inputHashTag}
              onChange={hashTaghandler}
              onKeyPress={upKeyPress}
              name="hashTag"
            />
          </RF.TagBox>
        </RF.ReviewInputBox>
        <RF.ReviewSubmitBtn onClick={onSubmitReview}>입력</RF.ReviewSubmitBtn>
      </RF.ReviewForm>
    </>
  );
}

export default ExhibitionReviewForm;
