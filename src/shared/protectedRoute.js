import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usetoken } from "./cookies";

export const ProtectedRoute = ({ isPublic, isLogin, children }) => {
  const navigator = useNavigate();
  const { access_token } = usetoken();
  const isAuthenticated = isPublic || access_token;
  const isLogined = isLogin || !access_token;
  //토큰이 있다
  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인이 필요한 서비스 입니다.");
      navigator("/login");
    }
    if (!isLogined) {
      navigator("/");
    }
  }, [isAuthenticated, isLogined]);
  return children;
};
