import { apis_token } from "../../api/apis"
import { keys } from "../../shared/queryKeys"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export  const usePatchArtgram = () => {
  const queryClient = useQueryClient()
  const { mutate:patchArtgram } = useMutation({
    mutationFn: async({artgramId, payload}) => {
      await apis_token.patch(`/artgram/${artgramId}`, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.GET_ARTGRAM);
      queryClient.invalidateQueries(keys.GET_ARTGRAMDETAIL)
    },
    onError:(e)=> {
      console.log("아트그램 수정이 실패했습니다.", e.message);
    }
  })
  return {patchArtgram}
}