import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apis_token } from "../../api/apis";

export const usePostReview = (id) => {
  const queryClient = useQueryClient();
  const {
    mutate: createExhibition,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (payload) => {
      const res = await apis_token.post(
        `/exhibition/reviews/write/${id}`,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: keys. });
    },
  });
  return [createExhibition, isSuccess, isError];
};
