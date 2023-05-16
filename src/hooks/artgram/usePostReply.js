import { useState } from "react";
import { apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostReply = () => {
  const queryClient = useQueryClient();
  const { mutate: postReply } = useMutation({
    mutationFn: async ({ artgramId, commentId, reply }) => {
      await apis_token.post(`/artgram/${artgramId}/comments/${commentId}/replies`,{ comment: reply });
      return { artgramId, commentId };
    },
    onSuccess: ({ artgramId, commentId }) => {
      queryClient.invalidateQueries(keys.GET_ARTGRAM);
      queryClient.invalidateQueries(keys.GET_ARTGRAMCOMMENTS);
      queryClient.invalidateQueries([keys.GET_ARTGRAMREPLY + artgramId + commentId]);
    },
    onError: (e) => {
      console.log("대댓글이 등록되지 않았습니다.", e.message);
    },
  });

  const [reply, setReply] = useState(""); //대댓글 내용을 입력받을 input.value
  const [replyState, setReplyState] = useState(false); //대댓글 input을 호출할 상태
  const replyHandle = (e, artgramId, commentId, reply) => {
    e.preventDefault();
    if (reply) {
      postReply({ artgramId, commentId, reply });
    }
    setReply("");
    setReplyState((pre) => !pre);
  };

  return { replyState, setReplyState, reply, setReply, replyHandle };
};
