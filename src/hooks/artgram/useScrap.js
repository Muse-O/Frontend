import { apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useScrap = (searchWord) => {
  const queryClient = useQueryClient();
  const { mutate: patchScrap } = useMutation({
    mutationFn: async (artgramId) => {
      const reponse = await apis_token.patch(`artgram/${artgramId}/scrap`, null);
      return reponse.data.message;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.GET_ARTGRAM);
      queryClient.invalidateQueries(keys.GET_ARTGRAMDETAIL);
      queryClient.invalidateQueries([keys.GET_UNIFIEDSEARCH, searchWord]);
    },
    onError: (e) => {
      console.log("error", e.message)
    },
  });
  return { patchScrap };
};
