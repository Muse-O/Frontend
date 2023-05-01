import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";

export const usePatchRole = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async email => {
      //   console.log(email, "payload");
      const data = await apis_token.patch("/admin/role", {
        approvingEmail: email,
      });
      return data;
    },
    onSuccess: () => {
      //state확인 후 true 상태 내보내기 -> 승인처리 알럿 띄우기
      queryClient.invalidateQueries(keys.GET_USERPROFILE);
    },
  });

  return {
    patchRole: mutate,
  };
};
