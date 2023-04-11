import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apis } from "../../api/apis";
import { keys } from "../../shared/queryKeys";
import { cookies } from "../../shared/cookies";

export const useUpdateUserProfile = () => {
  const token = cookies.get("access_token");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async editProfile => {
      // console.log(editProfile, "editProfile");
      const data = await apis.patch("/mypage", editProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data;
    },
    onSuccess: () => {
      alert("수정 완료되었습니다!");
      //성공시 유저프로필 불러오기
      queryClient.invalidateQueries(keys.GET_USERPROFILE);
    },
  });
  return {
    updateUserProfile: mutate,
  };
};
