import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apis_token } from "../../api/apis";
import { keys } from "lodash";

export const useLikeExhibition = (exhibitionId) => {
  const queryClient = useQueryClient();
  const { mutate: LikeScrapExhibition } = useMutation({
    mutationFn: async (LikeScrap) => {
      const res = await apis_token.patch(
        `/exhibition/${LikeScrap}/${exhibitionId}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.GET_DETAILEXHIBITION });
    },
    onError: (e) => {
      console.log("에러", e);
    },
  });
  return [LikeScrapExhibition];
};
