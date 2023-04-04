import { useMutation } from "@tanstack/react-query";
import apis from "../../api/apis";
import { cookies } from "../../shared/cookies";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async payload => {
      //   console.log(payload, "payload"); //확인
      const response = await apis.post("/user/login", payload);
      const token = response.headers.authorization;
      cookies.set("token", token);
      //   console.log(token, "token"); //확인
      return response;
    },
    onSuccess: () => {
      navigate("/");
    },
  });
  //밖에서 login이라는 이름으로 해당 mutate 사용
  return {
    login: mutate,
  };
}

export default useLogin;
