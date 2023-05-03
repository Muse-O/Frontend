import { useState } from "react";

export const ReviewRating = () => {
  const [rating, setRating] = useState(0); // 현재 별점 상태
  const handleHover = (value) => {
    setRating(value); // hover되는 별의 값으로 rating 상태를 업데이트
  };
  const ratingReview = [
    "별점을 등록해 주세요",
    "많이 아쉬웠어요.",
    "조금 아쉬웠어요. ",
    "보통이에요.",
    "좋아요. ",
    "최고의 경험이었어요.",
  ];
  return [rating, setRating, handleHover, ratingReview];
};
