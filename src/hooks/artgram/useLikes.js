import { apis_token } from "../../api/apis"
import { keys } from "../../shared/queryKeys"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useLikes = (searchWord) => {
  const queryClient = useQueryClient()
  const { mutate : patchLikes } = useMutation({
    mutationFn : async (artgramId) => {
      const reponse = await apis_token.patch(`artgram/${artgramId}/likes`, null)
      return reponse
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.GET_ARTGRAM);
      queryClient.invalidateQueries(keys.GET_ARTGRAMDETAIL);
      queryClient.invalidateQueries([keys.GET_UNIFIEDSEARCH, searchWord]);
    },
    onError: e => {
    }
  })
  return {patchLikes}
}

