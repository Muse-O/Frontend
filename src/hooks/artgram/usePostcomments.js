import { apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostcomments = (setFormState) => {
  const queryClient = useQueryClient();
  const {mutate:postCommet} = useMutation({
    mutationFn : async ({artgramId, formState}) => {
      const response = await apis_token.post(`/artgram/${artgramId}/comments`, {comment:formState});
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.GET_ARTGRAM);
      queryClient.invalidateQueries(keys.GET_ARTGRAMCOMMENTS);
    },
    onError: e => {
      console.log("댓글이 등록되지 않았습니다.", e.message);
    }
  })
  const commentHandle = (e, artgramId, formState) => {
    e.preventDefault()
    postCommet({artgramId, formState})
    setFormState({})
  }

  return [commentHandle]
}