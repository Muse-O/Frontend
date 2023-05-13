import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";

export const usePostReview = (id) => {
  const queryClient = useQueryClient();
  const { mutate: createReview } = useMutation({
    mutationFn: async (payload) => {
      const res = await apis_token.post(`/exhibition/${id}/reviews`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.GET_REVIEWS] });
      queryClient.invalidateQueries({ queryKey: keys.GET_DETAILEXHIBITION });
    },
  });
  return [createReview];
};
