import { useMutation } from "@tanstack/react-query";
import { apis } from "../../api/apis";
import { cookies } from "../../shared/cookies";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { decodeAccessToken } from "../../features/login/loginTokenStore";
import jwtDecode from "jwt-decode";
import {
  headerStateSearch,
  headerStatedefalut,
} from "../../components/headerStore";
import Swal from "sweetalert2";

function useLogin() {
  const navigate = useNavigate();
  const [, setDecodeAccessToken] = useRecoilState(decodeAccessToken);
  const headerStateSearchs = useRecoilValue(headerStateSearch);
  const [, setHeaderState] = useRecoilState(headerStatedefalut);
  const { mutate } = useMutation({
    mutationFn: async payload => {
      const response = await apis.post("/auth/token", payload);
      const token = response.headers.authorization;
      cookies.set("access_token", token, { maxAge: 21540 });
      // cookies.set("access_token", token, { maxAge: 10 });
      setTimeout(() => {
        setTimeout(() => {
          window.location.reload(true);
        }, 59999); //1분
        Swal.fire({
          title: "\n1분 뒤 로그아웃 됩니다.",
          focusConfirm: false,
        });
      }, 21540000);

      return response;
    },
    onSuccess: () => {
      const accessToken = cookies.get("access_token");
      setHeaderState({ ...headerStateSearchs });
      setDecodeAccessToken(jwtDecode(accessToken));
      Swal.fire({
        title: "\n로그인 완료하였습니다.",
        focusConfirm: false,
      });
      navigate("/");
    },
    onError: () => {
      Swal.fire({
        title: "이메일 또는 비밀번호를 \n확인해주세요.",
        icon: "warning",
        focusConfirm: false,
      });
    },
  });

  return {
    login: mutate,
  };
}

export default useLogin;
