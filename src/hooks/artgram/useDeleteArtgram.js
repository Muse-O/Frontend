import { apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteArtgram = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteArtgram } = useMutation({
    mutationFn: async (artgramId) => {
      await apis_token.patch(`/artgram/${artgramId}/remove`, null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.GET_ARTGRAM);
    },
    onError: (e) => {
      console.log("아트그램이 삭제되지 않았습니다.", e.message);
    },
  });
  const deleteHandle = (artgramId) => {
    deleteArtgram(artgramId);
  };

  return { deleteHandle };
};
