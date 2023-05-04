import { useState } from "react";
import { apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdatecomments = (artgramId, commentId) => {
  const queryClient = useQueryClient();
  const { mutate: updateCommet } = useMutation({
    mutationFn: async ({ artgramId, commentId, updatecomment }) => {
      const response = await apis_token.patch(`/artgram/${artgramId}/comments/${commentId}`,{ comment: updatecomment });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.GET_ARTGRAM);
      queryClient.invalidateQueries(keys.GET_ARTGRAMCOMMENTS);
    },
    onError: (e) => {
      console.log("댓글이 수정되지 않았습니다.", e.message);
    },
  });

  const [edit, setEdit] = useState(false);
  const [updatecomment, setUpdateComment] = useState("");

  const onSubmitupdateComments = (e) => {
    e.preventDefault();
    updateCommet({ artgramId, commentId, updatecomment });
    setEdit((pre) => !pre);
    setUpdateComment("");
  };

  const resetReply = (setReply) => {
    setReply("");
  }
  return {
    edit,
    setEdit,
    updatecomment,
    setUpdateComment,
    resetReply,
    onSubmitupdateComments,
  };
};
