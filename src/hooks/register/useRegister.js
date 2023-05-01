import { useMutation } from "@tanstack/react-query";
import { apis } from "../../api/apis";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; //react-toastify
import "react-toastify/dist/ReactToastify.css"; //react-toastify

export function useRegister() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async payload => {
      const data = await apis.post("/auth/signup", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("회원 가입이 완료되었습니다!");
      navigate("/");
    },
    onError: error => {
      toast.error(error.response.data.errorMessage);
    },
  });
  //밖에서 register라는 이름으로 해당 mutate 사용
  return {
    register: mutate,
  };
}
