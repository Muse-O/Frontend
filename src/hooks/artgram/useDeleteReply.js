import { apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteReply = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteReply } = useMutation({
    mutationFn: async ({ artgramId, commentParent, commentId }) => {
      await apis_token.patch(`/artgram/${artgramId}/comments/${commentParent}/reply/${commentId}/remove`, null);
      return { artgramId, commentParent };
    },
    onSuccess: ({ artgramId, commentParent }) => {
      queryClient.invalidateQueries(keys.GET_ARTGRAM);
      queryClient.invalidateQueries(keys.GET_ARTGRAMCOMMENTS);
      queryClient.invalidateQueries([keys.GET_ARTGRAMREPLY + artgramId + commentParent]);
    },
    onError: (e) => {
      console.log("댓글이 삭제되지 않았습니다.", e.message);
    },
  });
  const deleteHandle = (artgramId, commentParent, commentId) => {
    deleteReply({ artgramId, commentParent, commentId });
  };

  return { deleteHandle };
};
