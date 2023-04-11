import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";

export const useDeleteExhibition = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteExhibition } = useMutation({
    mutationFn: async (id) => {
      const res = await apis_token.delete(`/exhibition/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      alert("삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: keys.GET_EXHIBITION });
    },
    onError: (e) => {
      console.log("에러", e);
    },
  });
  return [deleteExhibition];
};
