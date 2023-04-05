import { useMutation } from "@tanstack/react-query";
import { apis } from "../../api/apis";

export function useEmailConfirm() {
  const { mutate, error } = useMutation({
    mutationFn: async payload => {
      const data = await apis.post("/user/emailconfirm", payload);
      return data;
    },
    onSuccess: data => {
      alert("사용 가능한 이메일입니다.");
    },
    onError: error => {
      alert(error.response.data.errorMessage);
    },
  });

  return {
    emailConfirm: mutate,
  };
}
