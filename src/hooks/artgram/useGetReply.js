import { apis } from "../../api/apis";
import { keys } from "../../shared/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetReply = (artgramId, commentId) => {
  
  const {isLoading, isError, data} = useQuery({
    queryKey:[keys.GET_ARTGRAMREPLY+artgramId+commentId],
    queryFn: async() => {
      const response = await apis.get(`/artgram/${artgramId}/comments/${commentId}/reply`);
      return response.data.Reply
    },
    onError: (e) => {
      console.log("대댓글 조회실패", e.message)
    }
  })
  return {isLoading, isError, data}
}