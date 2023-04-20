import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cookies } from "../../../shared/cookies";
import { apis } from "../../../api/apis";
import { keys } from "../../../shared/queryKeys";


export const usePostReply = (setReply, setReplyState) => {
  const queryClient = useQueryClient();
  const {mutate:postReply} = useMutation({
    mutationFn : async ({artgramId,commentId,reply}) => {
      console.log(reply);
      const token = cookies.get("access_token");
      const response = await apis.post(`/artgram/${artgramId}/comments/${commentId}/reply`, {comment:reply}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.GET_ARTGRAMCOMMENTS);
      queryClient.invalidateQueries(keys.GET_ARTGRAM);
      queryClient.invalidateQueries(keys.GET_ARTGRAMREPLY);
      console.log("대댓글이 등록되었습니다.");
    },
    onError: e => {
      console.log("대댓글이 등록되지 않았습니다.", e.message);
    }
  })
  const replyHandle = (e, artgramId, commentId, reply) => {
    e.preventDefault()
    postReply({artgramId,commentId,reply})
    setReply('')
    setReplyState(pre=>!pre)
  }

  return {replyHandle}
}