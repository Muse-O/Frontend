import { useState } from "react";
import { usetoken } from "../../../../shared/cookies";

export const PostReview = (
  createReview,
  hashTag,
  setRating,
  setInputHashTag,
  setHashTags
) => {
  const { access_token } = usetoken();
  const template = {
    reviewComment: "",
    reviewRating: 0,
  };
  const [postReview, setPostReviews] = useState(template);

  const reviewHandler = (event) => {
    const { value, name } = event.target;
    if (name === "reviewRating") {
      const satarvalue = event.target.dataset.value;
      setPostReviews((pre) => {
        return {
          ...pre,
          [name]: Number(satarvalue),
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
  //제출하기
  const onSubmitReview = (e) => {
    e.preventDefault();
    if (!access_token) {
      alert("로그인이 필요한 서비스 입니다.");
      return;
    }
    if (postReview.reviewComment === "") {
      alert("리뷰를 작성해 주세요");
    } else if (postReview.reviewRating === 0) {
      alert("별점을 등록해 주세요");
    } else {
      createReview({ hashTag, ...postReview });
      setPostReviews(template);
      setRating(0);
      setInputHashTag("");
      setHashTags([]);
    }
  };

  return [reviewHandler, postReview, onSubmitReview];
};
