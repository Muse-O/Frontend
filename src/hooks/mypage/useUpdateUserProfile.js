import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async payload => {
      await apis_token.patch("/mypage", payload);
    },
    onSuccess: () => {
      //성공시 유저프로필 불러오기
      queryClient.invalidateQueries(keys.GET_USERPROFILE);
    },
  });
  return {
    updateUserProfile: mutate,
  };
};
