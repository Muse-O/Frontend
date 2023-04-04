import { useMutation } from "@tanstack/react-query";
import apis from "../../api/apis";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async payload => {
      const { data } = await apis.post("/user/signup", payload);
      return data;
    },
    onSuccess: () => {
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    },
  });
  return {
    register: mutate,
  };
}
