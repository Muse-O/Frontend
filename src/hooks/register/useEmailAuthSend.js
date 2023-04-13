import { useMutation } from "@tanstack/react-query";
import { apis } from "../../api/apis";

export function useEmailAuthSend() {
  const { mutate } = useMutation({
    mutationFn: async payload => {
      const data = await apis.post("/auth/emailvalidate", payload);
      return data;
    },
    onSuccess: () => {
      alert("인증 메일이 발송되었습니다. 인증코드를 입력해주세요.");
    },
    //없는 이메일 등 에러처리 해야함
    onError: error => {
      alert(error.response.data.errorMessage);
    },
  });
  return {
    emailAuthSend: mutate,
  };
}
