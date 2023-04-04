import { useMutation } from "@tanstack/react-query";
import apis from "../../api/apis";
import { cookies } from "../../shared/cookies";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async payload => {
      const response = await apis.post("/user/login", payload);
      const token = response.headers.authorization;
      //"access_token"이라고 한 이유
      //-> 나중에 refresh token 구현해야할수도 있어서 구분용으로 지음.
      cookies.set("access_token", token);
      return response;
    },
    onSuccess: () => {
      alert("로그인 완료하였습니다!");
      navigate("/");
    },
  });
  //밖에서 login이라는 이름으로 해당 mutate 사용
  return {
    login: mutate,
  };
}

export default useLogin;
