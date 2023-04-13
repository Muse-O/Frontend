import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apis } from "../../api/apis"
import { cookies } from "../../shared/cookies"
import { keys } from "../../shared/queryKeys"

export const useScrap = () => {
  const queryClient = useQueryClient()
  const { mutate : patchScrap } = useMutation({
    mutationFn : async (artgramId) => {
      const token = cookies.get("access_token")
      const reponse = await apis.patch(`artgram/${artgramId}/scrap`, null, {
        headers: {
          Authorization : `Bearer ${token}`
        },
      })
      return reponse.data.message
    },
    onSuccess: (reponse) => {
      queryClient.invalidateQueries(keys.GET_ARTGRAMDETAIL);
      queryClient.invalidateQueries(keys.GET_ARTGRAM);
     alert(reponse);
    },
    onError: e => {
      console.log("스크랩이 등록되지 않았습니다.", e.message);
    }
  })
  return {patchScrap}
}

