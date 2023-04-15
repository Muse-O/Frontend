import { useQuery } from "@tanstack/react-query";
import { keys } from "../../shared/queryKeys";
import { apis } from "../../api/apis";

export const useGetReview = (id, limit, offset) => {
  const { data: reviewData, isLoading } = useQuery({
    queryKey: [keys.GET_REVIEWS, id, limit, offset],
    queryFn: async () => {
      const res = await apis.get(
        `/exhibition/${id}/reviews?limit=${limit}&offset=${offset}`
      );
      return res.data.exhibitionReviewList;
    },
  });
  return [reviewData, isLoading];
};
