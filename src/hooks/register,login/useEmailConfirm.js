import { useMutation } from "@tanstack/react-query";
import { apis } from "../../api/apis";
import { useState } from "react";

export function useEmailConfirm() {
  const [checkEmailConfirm, setCheckEmailConfirm] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async payload => {
      const data = await apis.post("/user/emailconfirm", payload);
      return data;
    },
    onSuccess: data => {
      if (data.status === 201) {
        alert("사용 가능한 이메일입니다");
        setCheckEmailConfirm(true);
      }
    },
    onError: error => {
      if (error) {
        setCheckEmailConfirm(false);
        alert(error.response.data.errorMessage);
      }
    },
  });

  return {
    emailConfirm: mutate,
    checkEmailConfirm,
  };
}
