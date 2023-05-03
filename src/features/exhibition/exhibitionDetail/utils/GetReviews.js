import { useState } from "react";
import { usetoken } from "../../../../shared/cookies";
import { useGetReview } from "../../../../hooks/exhibition/useGetReview";

export const GetReviews = (exhibitionID) => {
  const { decodetoken } = usetoken();
  const userEmail = decodetoken?.email;
  const [limit, setLimit] = useState(5);
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
  return [reviewData, userEmail, changePage, page, pageNum];
};
