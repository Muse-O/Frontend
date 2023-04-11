import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cookies } from "../../shared/cookies";
import { apis } from "../../api/apis";
import { keys } from "../../shared/queryKeys";

export const usePostcomments = (setFormState) => {
  const queryClient = useQueryClient();
  const {mutate:postCommet} = useMutation({
    mutationFn : async ({artgramId, formState}) => {
      const token = cookies.get("access_token");
      console.log(token);
      console.log(`${artgramId}, ${formState}`);
      const response = await apis.post(`/artgram/${artgramId}/comments`, {comment:formState}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.GET_ARTGRAMCOMMENTS);
      console.log("댓글이 등록되었습니다.");
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