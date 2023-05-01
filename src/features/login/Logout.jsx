import React from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import { NavBottomPath } from "../../shared/GlobalStyled";
import { useRecoilState } from "recoil";
import { decodeAccessToken } from "./loginTokenStore";

function Logout({ setIsLoggedIn, isLoggedIn }) {
  const [,setDecodeAccessToken] = useRecoilState(decodeAccessToken)
  const navigate = useNavigate();
  const logoutHandler = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      const cookies = new Cookies();
      cookies.remove("access_token");
      setDecodeAccessToken({})
      setIsLoggedIn(false);
      alert("로그아웃 되었습니다.");
      navigate("/");
    }
  };

  return isLoggedIn && (<NavBottomPath onClick={logoutHandler} children="로그아웃"/>)
    
}

export default Logout;