import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cookies } from "../../../shared/cookies";
import { apis } from "../../../api/apis";
import { keys } from "../../../shared/queryKeys";

export const useUpdatecomments = () => {
  const queryClient = useQueryClient();
  const {mutate:updateCommet} = useMutation({
    mutationFn : async ({artgramId, commentId, updatecomment}) => {
      const token = cookies.get("access_token");
      const response = await apis.patch(`/artgram/${artgramId}/comments/${commentId}`, {comment:updatecomment}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.GET_ARTGRAMCOMMENTS);
      queryClient.invalidateQueries(keys.GET_ARTGRAM);
      console.log("댓글이 수정되었습니다.");
    },
    onError: e => {
      console.log("댓글이 수정되지 않았습니다.", e.message);
    }
  })
  const updateHandle = (artgramId, commentId, updatecomment) => {
    updateCommet({artgramId, commentId, updatecomment})
  }

  return {updateHandle}
}
