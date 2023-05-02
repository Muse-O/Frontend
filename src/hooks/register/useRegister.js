import { useMutation } from "@tanstack/react-query";
import { apis } from "../../api/apis";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function useRegister() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async payload => {
      const data = await apis.post("/auth/signup", payload);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "회원 가입이 완료되었습니다!",
        focusConfirm: false,
        icon: "success",
      });
      navigate("/");
    },
    onError: error => {
      Swal.fire({
        title: error.response.data.errorMessage,
        focusConfirm: false,
        icon: "warning",
      });
    },
  });
  //밖에서 register라는 이름으로 해당 mutate 사용
  return {
    register: mutate,
  };
}
