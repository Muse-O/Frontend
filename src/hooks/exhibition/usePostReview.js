import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apis, apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";

export const usePostReview = (id) => {
  const queryClient = useQueryClient();
  const { mutate: createExhibition } = useMutation({
    mutationFn: async (payload) => {
      const res = await apis_token.post(
        `/exhibition/reviews/write/${id}`,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      alert("리뷰 작성완료");
      queryClient.invalidateQueries({ queryKey: keys.GET_REVIEWS });
    },
  });
  return [createExhibition];
};
