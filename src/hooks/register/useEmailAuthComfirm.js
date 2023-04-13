import { useMutation } from "@tanstack/react-query";
import { apis } from "../../api/apis";

export function useEmailAuthConfirm() {
  const { mutate } = useMutation({
    mutationFn: async payload => {
      console.log(payload, "payload");
      const data = await apis.post("/auth/emailcodecheck", payload);
      return data;
    },
    onSuccess: () => {
      alert("이메일 인증에 성공하였습니다.");
    },
    //시간 만료, 인증번호 틀림 에러처리
    onError: error => {
      alert(error.response.data.errorMessage);
    },
  });
  return {
    emailAuthConfirm: mutate,
  };
}
