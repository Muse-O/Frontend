import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apis } from "../../api/apis"
import { cookies } from "../../shared/cookies"
import { keys } from "../../shared/queryKeys"

export const useLikes = () => {
  const queryClient = useQueryClient()
  const { mutate : patchLikes } = useMutation({
    mutationFn : async (artgramId) => {
      const token = cookies.get("access_token")
      console.log(artgramId);
      console.log(token);
      const reponse = await apis.patch(`artgram/${artgramId}/likes`, null, {
        headers: {
          Authorization : `Bearer ${token}`
        },
      })
      return reponse
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.GET_ARTGRAMDETAIL);
      queryClient.invalidateQueries(keys.GET_ARTGRAM);
      console.log("좋아요가 등록되었습니다.");
    },
    onError: e => {
      console.log("좋아요가 등록되지 않았습니다.", e.message);
    }
  })
  return {patchLikes}
}

