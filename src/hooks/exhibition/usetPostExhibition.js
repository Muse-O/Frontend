import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apis, apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";

export const usePostExhibition = () => {
  const queryClient = useQueryClient();
  const { mutate: createExhibition } = useMutation({
    mutationFn: async (payload) => {
      const res = await apis_token.post("/exhibition/write", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.GET_EXHIBITION });
      alert("생성완료");
    },
  });

  return [createExhibition];
};
