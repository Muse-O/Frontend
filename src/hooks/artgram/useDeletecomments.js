import { apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletecomments = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCommet } = useMutation({
    mutationFn: async ({ artgramId, commentId }) => {
      const response = await apis_token.patch(`/artgram/${artgramId}/comments/${commentId}/remove `, null);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.GET_ARTGRAM);
      queryClient.invalidateQueries(keys.GET_ARTGRAMCOMMENTS);
    },
    onError: (e) => {
      console.log("댓글이 삭제되지 않았습니다.", e.message);
    },
  });
  const deleteHandle = (artgramId, commentId) => {
    deleteCommet({ artgramId, commentId });
  };

  return { deleteHandle };
};
